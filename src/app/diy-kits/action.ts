"use server";

import { z } from "zod";
import { suggestDiyKits } from "@/ai/flows/suggest-diy-kits";

const schema = z.object({
  scooterModel: z.string().min(3, "Please enter a valid scooter model."),
  userReportedIssue: z.string().min(10, "Please describe the issue in more detail."),
});

type State = {
  message?: string | null;
  suggestions?: string[];
  errors?: {
    scooterModel?: string[];
    userReportedIssue?: string[];
  };
};

export async function getDiySuggestions(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = schema.safeParse({
    scooterModel: formData.get("scooterModel"),
    userReportedIssue: formData.get("userReportedIssue"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "validationMessage",
    };
  }

  try {
    const result = await suggestDiyKits({
      scooterModel: validatedFields.data.scooterModel,
      userReportedIssue: validatedFields.data.userReportedIssue,
    });
    
    if (result.suggestedKits && result.suggestedKits.length > 0) {
        return { message: "suggestionsMessage", suggestions: result.suggestedKits };
    } else {
        return { message: "noSuggestionsMessage" };
    }
  } catch (error) {
    console.error(error);
    return { message: "errorMessage" };
  }
}
