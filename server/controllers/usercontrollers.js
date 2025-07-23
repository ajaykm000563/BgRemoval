import { Webhook } from "svix";
import userModel from "../models/usermodel.js";

const clerkWebHooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const payload = whook.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"]
    });

    const { data, type } = payload;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstname: data.first_name,
          lastname: data.last_name,
          photo: data.image_url,
        };
        await userModel.create(userData);
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstname: data.first_name,
          lastname: data.last_name,
          photo: data.image_url,
        };
        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        break;
      }
      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        break;
      }
    }

    res.status(200).json({ success: true });
  } catch (e) {
    console.log("Webhook error:", e.message);
    res.status(400).json({ success: false, message: e.message });
  }
};

export { clerkWebHooks };
