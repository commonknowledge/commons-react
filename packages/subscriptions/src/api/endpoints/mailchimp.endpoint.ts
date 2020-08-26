import Mailchimp from "mailchimp-api-v3";
const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);
import md5 from "md5";
import { Request, Response } from "express";

interface MailchimpSubscriptionHandlerOpts {
  /** Reason to communicate to user in emails that they have been subscribed */
  reason: string;
}

export const mailchimpSubscriptionHandler = async (
  req: Request,
  res: Response,
  { reason }: MailchimpSubscriptionHandlerOpts
) => {
  const { merge_fields, interests } = req.body;

  try {
    // Step 1: Post the user to Mailchimp
    const userData = {
      email_address: merge_fields.EMAIL,
      contact: reason,
      merge_fields,
      interests,
      status: "subscribed",
    };

    // Generate the UID of a mailchimp user
    // (The MD5 hash of the lowercase version of the list member's email address.)
    // Reference: https://mailchimp.com/developer/reference/lists/list-members/#get_/lists/-list_id-/members/-subscriber_hash-
    const lowercaseEmailHash = md5(userData.email_address.toLowerCase());

    try {
      const response = await mailchimp.put(
        `/lists/${process.env.MAILCHIMP_LIST_ID}/members/${lowercaseEmailHash}`,
        userData
      );
      return res.json(response);
    } catch (e) {
      return res
        .status(e?.status || 500)
        .json(e?.response?.body || { error: e.toString() });
    }
  } catch (e) {
    console.error("Something went wrong with signup.", e);
    return res.status(500).json(e);
  }
};

export default handler;
