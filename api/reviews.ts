import { db } from '../../src/server/db';
import { validateSessionToken } from '../../src/server/auth';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const reviews = db.getApprovedReviews();
    return res.status(200).json({ success: true, reviews });
  }

  if (req.method === 'POST') {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace(/^Bearer\s+/i, '');
    const { rating, reviewText, reviewerName, jobTitle } = req.body || {};

    if (!rating || !reviewText || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Valid rating (1-5) and review text are required' });
    }

    const sessionData = token ? validateSessionToken(token) : null;
    const userEmail = sessionData?.user?.email || req.body.userEmail || 'anonymous@jobhuntai.com';
    const userId = sessionData?.user?.id || 'usr_guest';

    // Verify if user is a paid customer
    const userPurchases = db.findPurchasesByEmail(userEmail);
    const isVerifiedPurchase = userPurchases.some(p => p.status === 'paid');

    const newReview = db.createReview({
      userId,
      userEmail,
      reviewerName: reviewerName?.trim() || sessionData?.user?.name || 'JOBHUNT AI User',
      jobTitle: jobTitle?.trim() || 'Job Seeker',
      rating: Number(rating),
      reviewText: reviewText.trim(),
      isVerifiedPurchase,
      isApproved: true // Auto-approved or set via admin
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your review has been published.',
      review: newReview
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}