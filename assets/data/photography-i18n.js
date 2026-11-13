import { findPhotographyTheme } from './photography.js';

export const photographyI18n = {
  "zh": {
    "themes": {
      "verdant": {
        "title": "青绿 · 林间",
        "description": "树荫、绿意与日光在屋檐和水岸之间流动。"
      },
      "azure": {
        "title": "蓝紫 · 远方",
        "description": "沿着水面与山影，收集清澈、冷静的蓝色瞬间。"
      },
      "amber": {
        "title": "暖金 · 余晖",
        "description": "在逆光、日落与水波里留下暖色的片刻。"
      },
      "chroma": {
        "title": "绯彩 · 人间",
        "description": "街头的红与花田的粉，组成热闹的色彩记忆。"
      },
      "earth": {
        "title": "大地 · 雾境",
        "description": "从岩层到薄雾，寻找大地安静而辽阔的纹理。"
      }
    },
    "photos": {}
  },
  "en": {
    "themes": {
      "verdant": {
        "title": "Verdant · In the Green",
        "description": "Green canopies, shaded rooftops and quiet lakesides in natural light."
      },
      "azure": {
        "title": "Azure · Beyond the Horizon",
        "description": "Lakes, distant ridgelines and cool blue horizons."
      },
      "amber": {
        "title": "Amber · Last Light",
        "description": "A sequence of golden hour light, boats and reflections."
      },
      "chroma": {
        "title": "Chroma · In Bloom",
        "description": "Red city moments and fields of vivid flowers."
      },
      "earth": {
        "title": "Earth · Hushed Terrain",
        "description": "Layered rocks, hazy mountains and spacious quiet landscapes."
      }
    },
    "photos": {
      "p01": {
        "title": "Up Through the Canopy",
        "alt": "Looking upward through a thick tree trunk and vivid green canopy"
      },
      "p02": {
        "title": "Roof Beneath the Leaves",
        "alt": "Deep green foliage shading an old tiled roof"
      },
      "p03": {
        "title": "Boat in the Morning Haze",
        "alt": "A long boat carrying people across a misty golden lake"
      },
      "p04": {
        "title": "Sunset Between Trees",
        "alt": "Sunset and water glimpsed between dark trees"
      },
      "p05": {
        "title": "Long Shadows",
        "alt": "Low sunlight casting long shadows through a grove of trees"
      },
      "p06": {
        "title": "Bird Above the Lake",
        "alt": "A bird perched on a post above a blue lake"
      },
      "p07": {
        "title": "Sunlit Spray",
        "alt": "Orange sunset illuminating water and splashing spray"
      },
      "p08": {
        "title": "Layers Beyond the Lake",
        "alt": "Blue lake in front of layered purple mountains"
      },
      "p09": {
        "title": "Boat in Backlight",
        "alt": "A person raising an arm on a long boat in golden backlight"
      },
      "p10": {
        "title": "Boat in the Mist",
        "alt": "A small passenger boat crossing a lake in golden mist"
      },
      "p11": {
        "title": "Light on the Water",
        "alt": "Warm evening light reflecting across rippled water by a lakeshore"
      },
      "p12": {
        "title": "Afterglow",
        "alt": "A calm lake reflecting orange afterglow below a dark ridgeline"
      },
      "p13": {
        "title": "Shoreline Layers",
        "alt": "Golden lakeside grass backed by blue-purple mountain layers"
      },
      "p14": {
        "title": "Peaks Above Pines",
        "alt": "Sharp snowy mountain peaks above a foreground of pine trees"
      },
      "p15": {
        "title": "Figures by the Lake",
        "alt": "Several figures beside a blue lake with forested mountains beyond"
      },
      "p16": {
        "title": "Blue Inlet",
        "alt": "Deep blue water and a narrow shore against purple mountains"
      },
      "p17": {
        "title": "Light in the Valley",
        "alt": "Strong reflected sunlight on water between mountain slopes"
      },
      "p18": {
        "title": "Fading Orange",
        "alt": "Orange twilight reflected on a lake beneath dark mountain silhouettes"
      },
      "p19": {
        "title": "Bare Trees by Water",
        "alt": "Bare trees and a railing beside blue-purple water"
      },
      "p20": {
        "title": "Tree Against Blue",
        "alt": "Green trees and distant hills under bright blue sky"
      },
      "p21": {
        "title": "Bright Lake Day",
        "alt": "Small boats scattered across a turquoise lake ringed by green hills"
      },
      "p22": {
        "title": "Under the Green",
        "alt": "Dense green foliage framing a narrow opening to the sky"
      },
      "p23": {
        "title": "Three Views of the Lake",
        "alt": "Three stacked views of lakes and green hills"
      },
      "p24": {
        "title": "Three Green Moments",
        "alt": "Three stacked photographs of green lakeside scenery"
      },
      "p25": {
        "title": "Red Bus on the Street",
        "alt": "A red double-decker bus among tall city buildings"
      },
      "p26": {
        "title": "Wheel Above the Road",
        "alt": "A red vehicle passing beneath a large distant observation wheel"
      },
      "p27": {
        "title": "Red in Motion",
        "alt": "A red taxi moving past a busy urban corner"
      },
      "p28": {
        "title": "Busy Crossing",
        "alt": "Double-decker buses and pedestrians at a city crossing"
      },
      "p29": {
        "title": "Cosmos in Bloom",
        "alt": "Pink and yellow cosmos flowers blooming in a colorful field"
      },
      "p30": {
        "title": "Among Wildflowers",
        "alt": "Orange, yellow and pink flowers filling a grassy field"
      },
      "p31": {
        "title": "Trees Reflected",
        "alt": "Bright green trees reflected in park water"
      },
      "p32": {
        "title": "Sunlit Needles",
        "alt": "Sunlight illuminating golden-green needle-like foliage"
      },
      "p33": {
        "title": "Blue Through the Trees",
        "alt": "Blue water and distant mountains framed by foreground trees"
      },
      "p34": {
        "title": "Light Above the Eaves",
        "alt": "Sunlight filtering through vivid green leaves above tiled eaves"
      },
      "p35": {
        "title": "Old Roof in Shade",
        "alt": "An old sloping tiled roof beneath deep green shade"
      },
      "p36": {
        "title": "Pink in the Meadow",
        "alt": "A person in pink standing alone on a broad green meadow"
      },
      "p37": {
        "title": "Road Through the Hills",
        "alt": "A winding road crossing layered sandstone-colored hills"
      },
      "p38": {
        "title": "Bands of Earth",
        "alt": "Exposed hills patterned with ochre and sandstone bands"
      },
      "p39": {
        "title": "Mountains in Mist",
        "alt": "Grey-purple ridges rising like waves through thick mist"
      },
      "p40": {
        "title": "White Form Reflected",
        "alt": "A white sail-shaped structure reflected in pale blue water"
      },
      "p41": {
        "title": "Green Waterline",
        "alt": "Wide turquoise-green water and a pale distant shoreline"
      },
      "p42": {
        "title": "Braided Waters",
        "alt": "An elevated view of winding pale-blue waterways and shorelines"
      },
      "p43": {
        "title": "Road Toward the Mountains",
        "alt": "A long causeway crossing blue water toward distant mountains"
      },
      "p44": {
        "title": "Veiled Mountain Ridge",
        "alt": "Grey haze and slanting sunlight over pale-brown mountains"
      },
      "p45": {
        "title": "Quiet Highlands",
        "alt": "Open pale grassland before distant brown-purple mountains"
      }
    }
  }
};

export function getLocalizedPhotographyTheme(id, language = 'zh') {
  const theme = findPhotographyTheme(id);
  if (!theme) return null;
  const locale = photographyI18n[language] ? language : 'zh';
  const translated = photographyI18n[locale];
  const copy = translated.themes[id] ?? photographyI18n.zh.themes[id] ?? {};
  return {
    ...theme,
    title: copy.title ?? id,
    description: copy.description ?? '',
    photos: theme.photos.map(photo => ({
      ...photo,
      ...(translated.photos[photo.id] ?? {})
    }))
  };
}
