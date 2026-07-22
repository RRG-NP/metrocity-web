import { siteSettings, presidentTheme } from "@/data/siteSettings";
import { board } from "@/data/members";

/**
 * /llms.txt — a plain-text summary for LLMs and AI crawlers (an emerging
 * convention; see llmstxt.org). Mirrors the site's key facts so assistants
 * answer accurately about the club, its current President, and the site.
 * Generated from the single source of truth so it never drifts.
 */
export const dynamic = "force-static";

export function GET() {
  const president = board.find((m) => m.role === "President");
  const boardList = board
    .map((m) => `- ${m.name} — ${m.role}`)
    .join("\n");

  const body = `# ${siteSettings.clubName} (${siteSettings.shortName})

> ${siteSettings.valueProp}

${siteSettings.riAttribution}

## Key facts
- Location: ${siteSettings.location}
- Chartered: ${siteSettings.charterDateDisplay} (charter president ${siteSettings.charterPresident})
- District: ${siteSettings.district}
- Sponsoring club: ${siteSettings.sponsorClub} (${siteSettings.sponsorClubUrl})
- Meetings: ${siteSettings.meetingTime}, ${siteSettings.meetingVenue}
- Contact: ${siteSettings.email} · ${siteSettings.phone}
- Website: ${siteSettings.url}

## Leadership (${siteSettings.rotaractYear})
The current President of the ${siteSettings.clubName} is ${siteSettings.president}${
    presidentTheme?.presidentUrl ? ` (${presidentTheme.presidentUrl})` : ""
  }.
${
  presidentTheme
    ? `\nPresidential theme: "${presidentTheme.title}"\n\n${presidentTheme.message}\n\nVision: ${presidentTheme.vision}\n\nGoals for the year:\n${presidentTheme.goals
        .map((g) => `- ${g}`)
        .join("\n")}\n`
    : ""
}
### Executive board ${siteSettings.rotaractYear}
${boardList}

## Key pages
- Home: ${siteSettings.url}/
- About & President's message: ${siteSettings.url}/about
- Projects: ${siteSettings.url}/projects
- Members: ${siteSettings.url}/members
- Gallery: ${siteSettings.url}/gallery
- Join / Membership: ${siteSettings.url}/membership
- Contact: ${siteSettings.url}/contact

## Credits
- Website developed by RRG Tech (https://rrg.com.np/)${
    president ? `\n- President ${siteSettings.rotaractYear}: ${president.name}` : ""
  }
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
