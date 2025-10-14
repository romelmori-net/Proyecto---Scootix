'use server';

/**
 * @fileOverview DIY kit suggestion flow.
 *
 * - suggestDiyKits - A function that suggests DIY kits based on scooter model and user-reported issues.
 * - SuggestDiyKitsInput - The input type for the suggestDiyKits function.
 * - SuggestDiyKitsOutput - The return type for the suggestDiyKits function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDiyKitsInputSchema = z.object({
  scooterModel: z.string().describe('The model of the scooter.'),
  userReportedIssue: z.string().describe('The issue reported by the user.'),
});
export type SuggestDiyKitsInput = z.infer<typeof SuggestDiyKitsInputSchema>;

const SuggestDiyKitsOutputSchema = z.object({
  suggestedKits:
    z
      .array(z.string())
      .describe('An array of DIY kit names that are suggested for the scooter model and issue.'),
});
export type SuggestDiyKitsOutput = z.infer<typeof SuggestDiyKitsOutputSchema>;

export async function suggestDiyKits(input: SuggestDiyKitsInput): Promise<SuggestDiyKitsOutput> {
  return suggestDiyKitsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDiyKitsPrompt',
  input: {schema: SuggestDiyKitsInputSchema},
  output: {schema: SuggestDiyKitsOutputSchema},
  prompt: `You are an expert in scooter maintenance and repair. A user has reported an issue with their scooter and provided the scooter model. Recommend a list of DIY kits that could help them fix the issue.

Scooter Model: {{{scooterModel}}}
User Reported Issue: {{{userReportedIssue}}}

Suggest DIY Kits:`,
});

const suggestDiyKitsFlow = ai.defineFlow(
  {
    name: 'suggestDiyKitsFlow',
    inputSchema: SuggestDiyKitsInputSchema,
    outputSchema: SuggestDiyKitsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
