import cv2
import numpy as np
from vectorize_helper import contour_to_svg_path

img_path = r'C:\Users\Lenovo\.gemini\antigravity\brain\9da691d7-610e-4ad6-9702-37b82aaf6e95\.user_uploaded\media_1793815914521_e84d9e5b.png'
img = cv2.imread(img_path)
h, w, _ = img.shape

upscale_factor = 8
highres = cv2.resize(img, (w * upscale_factor, h * upscale_factor), interpolation=cv2.INTER_CUBIC)
gray = cv2.cvtColor(highres, cv2.COLOR_BGR2GRAY)
denoised = cv2.bilateralFilter(gray, 11, 75, 75)

# 1. Monogram Extraction
mono_h = int(h * upscale_factor * 0.65)
mono_gray = denoised[:mono_h, :]
_, mono_thresh = cv2.threshold(mono_gray, 145, 255, cv2.THRESH_BINARY)
padded_mono = cv2.copyMakeBorder(mono_thresh, 20, 20, 20, 20, cv2.BORDER_CONSTANT, value=0)
mono_contours, _ = cv2.findContours(padded_mono, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_TC89_KCOS)

main_mono_contour = max(mono_contours, key=cv2.contourArea)
mono_pts = main_mono_contour - np.array([20, 20])
mx, my, mw, mh = cv2.boundingRect(mono_pts)

target_mono_w = 340
scale_mono = target_mono_w / mw
offset_mono_x = (600 - target_mono_w) / 2 - (mx * scale_mono)
offset_mono_y = 50 - (my * scale_mono)

mono_path_d = contour_to_svg_path(mono_pts, scale_x=scale_mono, scale_y=scale_mono, offset_x=offset_mono_x, offset_y=offset_mono_y)

# 2. Text Extraction with Holes (evenodd compound paths)
text_y_start = int(h * upscale_factor * 0.58)
text_y_end = int(h * upscale_factor * 0.88)
text_gray = denoised[text_y_start:text_y_end, :]
_, text_thresh = cv2.threshold(text_gray, 140, 255, cv2.THRESH_BINARY)
padded_text = cv2.copyMakeBorder(text_thresh, 20, 20, 20, 20, cv2.BORDER_CONSTANT, value=0)
text_contours, text_hier = cv2.findContours(padded_text, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_TC89_KCOS)

parent_to_children = {}
outer_contours = []
for i in range(len(text_contours)):
    parent_idx = text_hier[0][i][3]
    if parent_idx == -1:
        outer_contours.append(i)
        parent_to_children[i] = []
    else:
        if parent_idx in parent_to_children:
            parent_to_children[parent_idx].append(i)

target_text_w = 460
valid_contours = [text_contours[i] for i in outer_contours if cv2.contourArea(text_contours[i]) > 200]
all_letter_pts = np.vstack(valid_contours) - np.array([20, 20])
tx, ty, tw, th = cv2.boundingRect(all_letter_pts)

scale_text = target_text_w / tw
offset_text_x = (600 - target_text_w) / 2 - (tx * scale_text)
offset_text_y = 365 - (ty * scale_text)

compound_letter_paths = []
for p_idx in outer_contours:
    if cv2.contourArea(text_contours[p_idx]) < 200:
        continue
    c_outer = text_contours[p_idx] - np.array([20, 20])
    d_combined = contour_to_svg_path(c_outer, scale_x=scale_text, scale_y=scale_text, offset_x=offset_text_x, offset_y=offset_text_y)
    
    for ch_idx in parent_to_children.get(p_idx, []):
        c_inner = text_contours[ch_idx] - np.array([20, 20])
        d_inner = contour_to_svg_path(c_inner, scale_x=scale_text, scale_y=scale_text, offset_x=offset_text_x, offset_y=offset_text_y)
        d_combined += " " + d_inner
        
    compound_letter_paths.append(d_combined)

print(f"Generated {len(compound_letter_paths)} compound letter paths with hole cutouts")

svg_light = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 580" width="100%" height="100%">
  <defs>
    <linearGradient id="gMonoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8E63CB" />
      <stop offset="50%" stop-color="#5A2D91" />
      <stop offset="100%" stop-color="#35204F" />
    </linearGradient>

    <linearGradient id="gMonoHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9" />
      <stop offset="60%" stop-color="#D8C2F0" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#5A2D91" stop-opacity="0" />
    </linearGradient>

    <linearGradient id="gTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#35204F" />
      <stop offset="50%" stop-color="#5A2D91" />
      <stop offset="100%" stop-color="#35204F" />
    </linearGradient>

    <filter id="gDropShadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="6" stdDeviation="7" flood-color="#5A2D91" flood-opacity="0.20" />
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#35204F" flood-opacity="0.10" />
    </filter>

    <filter id="gSubtleShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#5A2D91" flood-opacity="0.15" />
    </filter>
  </defs>

  <g id="graphix-logo-group">
    <g id="monogram-symbol" filter="url(#gDropShadow)">
      <path d="{mono_path_d}" fill="url(#gMonoGrad)" fill-rule="evenodd" />
      <path d="{mono_path_d}" fill="none" stroke="url(#gMonoHighlight)" stroke-width="2.5" fill-rule="evenodd" opacity="0.85" />
    </g>

    <g id="wordmark-graphix" filter="url(#gSubtleShadow)">
      {" ".join([f'<path d="{p}" fill="url(#gTextGrad)" fill-rule="evenodd" />' for p in compound_letter_paths])}
    </g>

    <g id="tagline-group" transform="translate(300, 510)" text-anchor="middle">
      <text font-family="'Poppins', sans-serif" font-size="13" font-weight="700" letter-spacing="0.28em" fill="#5A2D91" text-anchor="middle">
        CREATE VISIBILITY <tspan fill="#8E63CB" font-size="15" dy="-1">•</tspan><tspan dy="1"> BUILD IDENTITY</tspan>
      </text>

      <line x1="-80" y1="20" x2="80" y2="20" stroke="#D8C2F0" stroke-width="2" stroke-linecap="round" />
    </g>
  </g>
</svg>'''

with open('d:/AR-graphics/public/logo.svg', 'w', encoding='utf-8') as f:
    f.write(svg_light)

svg_dark = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 580" width="100%" height="100%">
  <defs>
    <linearGradient id="bgStudioGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5A2D91" />
      <stop offset="50%" stop-color="#401B6B" />
      <stop offset="100%" stop-color="#24103D" />
    </linearGradient>

    <linearGradient id="whiteMaterial" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="85%" stop-color="#F8F6FA" />
      <stop offset="100%" stop-color="#E5DCF2" />
    </linearGradient>

    <filter id="deep3DShadow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="-2" dy="8" stdDeviation="10" flood-color="#140624" flood-opacity="0.80" />
      <feDropShadow dx="-1" dy="3" stdDeviation="4" flood-color="#24103D" flood-opacity="0.55" />
    </filter>
  </defs>

  <rect width="600" height="580" rx="36" fill="url(#bgStudioGrad)" />

  <g id="graphix-dark-logo-group" filter="url(#deep3DShadow)">
    <g id="monogram-symbol">
      <path d="{mono_path_d}" fill="url(#whiteMaterial)" fill-rule="evenodd" />
      <path d="{mono_path_d}" fill="none" stroke="#FFFFFF" stroke-width="1.8" fill-rule="evenodd" opacity="0.9" />
    </g>

    <g id="wordmark-graphix">
      {" ".join([f'<path d="{p}" fill="url(#whiteMaterial)" fill-rule="evenodd" />' for p in compound_letter_paths])}
    </g>

    <g id="tagline-group" transform="translate(300, 510)" text-anchor="middle">
      <text font-family="'Poppins', sans-serif" font-size="13" font-weight="700" letter-spacing="0.28em" fill="#FFFFFF" text-anchor="middle" opacity="0.95">
        CREATE VISIBILITY <tspan fill="#D8C2F0" font-size="15" dy="-1">•</tspan><tspan dy="1"> BUILD IDENTITY</tspan>
      </text>

      <line x1="-80" y1="20" x2="80" y2="20" stroke="#D8C2F0" stroke-width="2" stroke-linecap="round" opacity="0.8" />
    </g>
  </g>
</svg>'''

with open('d:/AR-graphics/public/logo-3d-dark.svg', 'w', encoding='utf-8') as f:
    f.write(svg_dark)

target_icon_size = 310
scale_icon = target_icon_size / max(mw, mh)
offset_icon_x = (400 - mw * scale_icon) / 2 - (mx * scale_icon)
offset_icon_y = (400 - mh * scale_icon) / 2 - (my * scale_icon)
mono_icon_path_d = contour_to_svg_path(mono_pts, scale_x=scale_icon, scale_y=scale_icon, offset_x=offset_icon_x, offset_y=offset_icon_y)

svg_monogram = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="monoGradIcon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8E63CB" />
      <stop offset="60%" stop-color="#5A2D91" />
      <stop offset="100%" stop-color="#35204F" />
    </linearGradient>

    <linearGradient id="monoHighlightIcon" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#D8C2F0" stop-opacity="0.15" />
    </linearGradient>

    <filter id="monoShadowIcon" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#5A2D91" flood-opacity="0.25" />
    </filter>
  </defs>

  <g filter="url(#monoShadowIcon)">
    <path d="{mono_icon_path_d}" fill="url(#monoGradIcon)" fill-rule="evenodd" />
    <path d="{mono_icon_path_d}" fill="none" stroke="url(#monoHighlightIcon)" stroke-width="2.5" fill-rule="evenodd" opacity="0.8" />
  </g>
</svg>'''

with open('d:/AR-graphics/public/logo-monogram.svg', 'w', encoding='utf-8') as f:
    f.write(svg_monogram)

with open('d:/AR-graphics/public/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(svg_monogram)

print("Generated all logo files with compound evenodd paths successfully!")
