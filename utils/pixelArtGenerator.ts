// Chinese characters for NFT generation
const CHINESE_CHARACTERS = [
  "火", "燃", "烧", "灭", "灰", "烟", "焰", "炉", "焚", "焦",
  "熔", "炼", "炽", "灼", "烈", "爆", "炸", "热", "温", "暖",
  "光", "明", "亮", "照", "辉", "闪", "耀", "炫", "灿", "煌",
  "力", "量", "能", "功", "劲", "强", "猛", "威", "武", "勇",
  "龙", "凤", "虎", "豹", "鹰", "鹤", "狮", "象", "熊", "狼",
  "金", "银", "铜", "铁", "钢", "玉", "石", "宝", "珍", "珠",
  "天", "地", "日", "月", "星", "云", "风", "雨", "雪", "雷",
  "山", "水", "海", "河", "湖", "林", "森", "木", "花", "草",
  "人", "心", "爱", "情", "义", "德", "善", "美", "真", "诚",
  "财", "富", "贵", "福", "禄", "寿", "喜", "吉", "祥", "瑞",
];

const BACKGROUND_COLORS = [
  "#F3BA2F", // Binance yellow
  "#1E1E1E", // Dark gray
  "#2D2D2D", // Medium gray
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#96CEB4", // Green
  "#FFEAA7", // Light yellow
  "#DDA15E", // Brown
  "#BC6C25", // Dark brown
];

const BORDER_STYLES = [
  "solid",
  "double",
  "dashed",
  "dotted",
];

export interface PixelArtNFT {
  character: string;
  backgroundColor: string;
  borderStyle: string;
  imageData: string; // Base64 encoded image
  metadata: {
    name: string;
    description: string;
    attributes: Array<{
      trait_type: string;
      value: string;
    }>;
  };
}

export function generatePixelArtNFT(): PixelArtNFT {
  // Randomly select character, background, and border
  const character =
    CHINESE_CHARACTERS[
      Math.floor(Math.random() * CHINESE_CHARACTERS.length)
    ];
  const backgroundColor =
    BACKGROUND_COLORS[
      Math.floor(Math.random() * BACKGROUND_COLORS.length)
    ];
  const borderStyle =
    BORDER_STYLES[Math.floor(Math.random() * BORDER_STYLES.length)];

  // Generate pixel art image
  const imageData = generatePixelArtImage(
    character,
    backgroundColor,
    borderStyle
  );

  // Create metadata
  const metadata = {
    name: `BSC Incinerator NFT #${Date.now()}`,
    description: `A unique pixel art NFT featuring the Chinese character "${character}" (${getCharacterMeaning(character)}). Minted by burning tokens on BSC Incinerator.`,
    attributes: [
      {
        trait_type: "Character",
        value: character,
      },
      {
        trait_type: "Background Color",
        value: backgroundColor,
      },
      {
        trait_type: "Border Style",
        value: borderStyle,
      },
      {
        trait_type: "Minted Date",
        value: new Date().toISOString(),
      },
    ],
  };

  return {
    character,
    backgroundColor,
    borderStyle,
    imageData,
    metadata,
  };
}

function generatePixelArtImage(
  character: string,
  backgroundColor: string,
  borderStyle: string
): string {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  // Fill background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, 512, 512);

  // Draw border
  ctx.strokeStyle = "#F3BA2F";
  ctx.lineWidth = 8;
  if (borderStyle === "double") {
    ctx.strokeRect(16, 16, 480, 480);
    ctx.strokeRect(24, 24, 464, 464);
  } else if (borderStyle === "dashed") {
    ctx.setLineDash([20, 10]);
    ctx.strokeRect(16, 16, 480, 480);
    ctx.setLineDash([]);
  } else if (borderStyle === "dotted") {
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(16, 16, 480, 480);
    ctx.setLineDash([]);
  } else {
    ctx.strokeRect(16, 16, 480, 480);
  }

  // Draw character in pixel style
  ctx.fillStyle = "#F3BA2F";
  ctx.font = "bold 256px 'Press Start 2P', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(character, 256, 256);

  // Add pixel effect (make it look more pixelated)
  const imageData = ctx.getImageData(0, 0, 512, 512);
  const data = imageData.data;

  // Apply pixelation effect
  const pixelSize = 4;
  for (let y = 0; y < 512; y += pixelSize) {
    for (let x = 0; x < 512; x += pixelSize) {
      const index = (y * 512 + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];

      // Fill the pixel block
      for (let py = 0; py < pixelSize && y + py < 512; py++) {
        for (let px = 0; px < pixelSize && x + px < 512; px++) {
          const pIndex = ((y + py) * 512 + (x + px)) * 4;
          data[pIndex] = r;
          data[pIndex + 1] = g;
          data[pIndex + 2] = b;
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL("image/png");
}

function getCharacterMeaning(character: string): string {
  const meanings: Record<string, string> = {
    火: "fire",
    燃: "burn",
    烧: "burn",
    灭: "extinguish",
    灰: "ash",
    烟: "smoke",
    焰: "flame",
    炉: "furnace",
    焚: "burn",
    焦: "charred",
    熔: "melt",
    炼: "refine",
    炽: "blazing",
    灼: "scorch",
    烈: "intense",
    爆: "explode",
    炸: "explode",
    热: "hot",
    温: "warm",
    暖: "warm",
    光: "light",
    明: "bright",
    亮: "bright",
    照: "illuminate",
    辉: "brilliance",
    闪: "flash",
    耀: "shine",
    炫: "dazzle",
    灿: "brilliant",
    煌: "brilliant",
  };

  return meanings[character] || "character";
}

