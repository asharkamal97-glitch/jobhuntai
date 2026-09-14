import { jsPDF } from 'jspdf';
import { Document, Paragraph, TextRun, Packer, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { ApplicationPackData, JobTrackerEntry } from '../types';
import { STARTER_KIT_MODULES, StarterKitModule } from '../data/starterKitData';

export function exportResumeAsPDF(resumeText: string, candidateName: string = 'Candidate', jobTitle: string = 'Resume') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const maxLineWidth = pageWidth - margin * 2;

  let y = 18;

  // Split lines
  const lines = resumeText.split('\n');

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Check if new page needed
    if (y > 275) {
      doc.addPage();
      y = 18;
    }

    if (index === 0 && trimmed.length > 0) {
      // Name header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42); // slate-900
      doc.text(trimmed, margin, y);
      y += 7;
      return;
    }

    if (trimmed.toUpperCase() === trimmed && trimmed.length > 3 && !trimmed.includes('•') && !trimmed.includes('@')) {
      // Section header
      y += 3;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(2, 107, 199); // brand-600
      doc.text(trimmed, margin, y);
      
      // Horizontal separator line
      doc.setDrawColor(226, 232, 240); // slate-200
      doc.setLineWidth(0.3);
      doc.line(margin, y + 1.5, pageWidth - margin, y + 1.5);
      
      y += 6;
      return;
    }

    // Regular line / bullet
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85); // slate-700

    if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
      const bulletText = trimmed.replace(/^[•\-*]\s*/, '');
      const wrapped = doc.splitTextToSize(bulletText, maxLineWidth - 5);
      
      doc.text('•', margin + 2, y);
      doc.text(wrapped, margin + 6, y);
      y += wrapped.length * 4.5 + 1;
    } else {
      const wrapped = doc.splitTextToSize(trimmed, maxLineWidth);
      doc.text(wrapped, margin, y);
      y += wrapped.length * 4.5 + 1;
    }
  });

  const fileName = `${candidateName.replace(/\s+/g, '_')}_Tailored_${jobTitle.replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
}

export async function exportResumeAsDocx(resumeText: string, candidateName: string = 'Candidate', jobTitle: string = 'Resume') {
  const lines = resumeText.split('\n');
  const docParagraphs: Paragraph[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      docParagraphs.push(new Paragraph({ spacing: { after: 100 } }));
      return;
    }

    if (index === 0) {
      docParagraphs.push(
        new Paragraph({
          text: trimmed,
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.LEFT,
          spacing: { after: 120 }
        })
      );
      return;
    }

    if (trimmed.toUpperCase() === trimmed && trimmed.length > 3 && !trimmed.includes('•') && !trimmed.includes('@')) {
      docParagraphs.push(
        new Paragraph({
          text: trimmed,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 80 }
        })
      );
      return;
    }

    if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
      const bulletText = trimmed.replace(/^[•\-*]\s*/, '');
      docParagraphs.push(
        new Paragraph({
          children: [new TextRun({ text: bulletText, size: 21 })],
          bullet: { level: 0 },
          spacing: { after: 60 }
        })
      );
      return;
    }

    docParagraphs.push(
      new Paragraph({
        children: [new TextRun({ text: trimmed, size: 21 })],
        spacing: { after: 60 }
      })
    );
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: docParagraphs
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `${candidateName.replace(/\s+/g, '_')}_Tailored_${jobTitle.replace(/\s+/g, '_')}.docx`;
  saveAs(blob, fileName);
}

export function exportTextFile(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, filename);
}

export function exportApplicationPackBundle(appPack: ApplicationPackData, company: string, role: string) {
  const fullContent = `# JOBHUNT AI — Complete Application Pack
Target Company: ${company}
Target Role: ${role}
Generated: ${new Date().toLocaleDateString()}
Philosophy: Evidence-First Optimization (No Fabricated Credentials)

==================================================
1. TAILORED RESUME
==================================================
${appPack.tailoredResume}

==================================================
2. COVER LETTER (PROFESSIONAL)
==================================================
${appPack.coverLetter.professional}

==================================================
3. COVER LETTER (WARM / CULTURE-ALIGNED)
==================================================
${appPack.coverLetter.warm}

==================================================
4. COVER LETTER (DIRECT / BULLETED)
==================================================
${appPack.coverLetter.direct}

==================================================
5. COVER LETTER (CONFIDENT / LEADERSHIP)
==================================================
${appPack.coverLetter.confident}

==================================================
6. LINKEDIN HEADLINE OPTIONS
==================================================
${appPack.linkedinHeadline.map((h, i) => `${i + 1}. ${h}`).join('\n')}

==================================================
7. LINKEDIN ABOUT SECTION
==================================================
${appPack.linkedinAbout}

==================================================
8. RECRUITER OUTREACH MESSAGE
==================================================
${appPack.recruiterMessage}

==================================================
9. INTERVIEW PREPARATION BRIEF
==================================================
${appPack.interviewPrepBrief}

==================================================
10. POST-INTERVIEW FOLLOW-UP MESSAGE
==================================================
${appPack.followUpMessage}

==================================================
11. JOB-SPECIFIC ACTION CHECKLIST
==================================================
${appPack.jobSpecificChecklist.map(c => `[${c.completed ? 'X' : ' '}] ${c.task} (${c.stage})`).join('\n')}
`;

  exportTextFile(fullContent, `JOBHUNT_AI_Application_Pack_${company.replace(/\s+/g, '_')}.md`);
}

export function exportStarterKitBundle() {
  let bundle = `# JOBHUNT AI STARTER KIT — Evidence-First Workflow Guide
One job. One workflow. One stronger application.
Complete 10-Module Operating System & Structured Framework.

`;

  STARTER_KIT_MODULES.forEach(mod => {
    bundle += `\n\n==================================================\n`;
    bundle += `MODULE ${mod.number}: ${mod.title.toUpperCase()} — ${mod.subtitle}\n`;
    bundle += `==================================================\n\n`;
    bundle += mod.content + '\n\n';
    if (mod.templates && mod.templates.length > 0) {
      bundle += `### Prompt Templates\n`;
      mod.templates.forEach(t => {
        bundle += `\n**${t.title}**\n\`\`\`\n${t.prompt}\n\`\`\`\n`;
      });
    }
  });

  exportTextFile(bundle, 'JOBHUNT_AI_Starter_Kit_Complete_Edition.md');
}

export function exportTrackerToCSV(applications: JobTrackerEntry[]) {
  const headers = ['Company', 'Role', 'Status', 'Match Score', 'Date Saved', 'Date Applied', 'Salary Range', 'Recruiter', 'Follow-Up Date', 'Interview Date', 'Notes'];
  
  const rows = applications.map(app => [
    `"${app.company.replace(/"/g, '""')}"`,
    `"${app.role.replace(/"/g, '""')}"`,
    `"${app.status}"`,
    `"${app.matchScore}%"`,
    `"${app.dateSaved || ''}"`,
    `"${app.dateApplied || ''}"`,
    `"${app.salaryRange || ''}"`,
    `"${(app.recruiterName || '').replace(/"/g, '""')}"`,
    `"${app.followUpDate || ''}"`,
    `"${app.interviewDate || ''}"`,
    `"${(app.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `JobHunt_AI_Tracker_${new Date().toISOString().slice(0, 10)}.csv`);
}
