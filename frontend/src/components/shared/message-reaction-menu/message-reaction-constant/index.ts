interface Reaction {
  id: string
  unified: string
  shortcodes: string
  native: string
}

export const Reactions: Array<Reaction> = [
  { id: "+1", unified: "1f44d", shortcodes: ":+1:", native: "👍" },
  { id: "grinning", unified: "1f600", shortcodes: ":grinning:", native: "😀" },
  { id: "heart_eyes", unified: "1f60d", shortcodes: ":heart_eyes:", native: "😍" },
  { id: "kissing_heart", unified: "1f618", shortcodes: ":kissing_heart:", native: "😘" },
  { id: "laughing", unified: "1f606", shortcodes: ":laughing:", native: "😆" },
  { id: "joy", unified: "1f602", shortcodes: ":joy:", native: "😂" },
  { id: "scream", unified: "1f631", shortcodes: ":scream:", native: "😱" },
]
