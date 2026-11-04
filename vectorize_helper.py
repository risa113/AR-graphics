import cv2
import numpy as np

def contour_to_svg_path(contour, scale_x=1.0, scale_y=1.0, offset_x=0.0, offset_y=0.0):
    pts = contour.reshape(-1, 2)
    if len(pts) < 3:
        return ""
    
    # Smooth with approxPolyDP first to reduce pixel noise while preserving curves
    epsilon = 1.0
    approx = cv2.approxPolyDP(contour, epsilon, True).reshape(-1, 2)
    if len(approx) < 3:
        approx = pts
        
    d = []
    # Start at first point
    p0 = approx[0]
    p0x = float(p0[0]) * float(scale_x) + float(offset_x)
    p0y = float(p0[1]) * float(scale_y) + float(offset_y)
    d.append(f"M {p0x:.1f} {p0y:.1f}")
    
    n = len(approx)
    for i in range(n):
        curr = approx[i].astype(float)
        nxt = approx[(i + 1) % n].astype(float)
        prev = approx[(i - 1 + n) % n].astype(float)
        nxt2 = approx[(i + 2) % n].astype(float)
        
        cp1_x = curr[0] + (nxt[0] - prev[0]) / 6.0
        cp1_y = curr[1] + (nxt[1] - prev[1]) / 6.0
        cp2_x = nxt[0] - (nxt2[0] - curr[0]) / 6.0
        cp2_y = nxt[1] - (nxt2[1] - curr[1]) / 6.0
        
        c1x = float(cp1_x) * float(scale_x) + float(offset_x)
        c1y = float(cp1_y) * float(scale_y) + float(offset_y)
        c2x = float(cp2_x) * float(scale_x) + float(offset_x)
        c2y = float(cp2_y) * float(scale_y) + float(offset_y)
        end_x = float(nxt[0]) * float(scale_x) + float(offset_x)
        end_y = float(nxt[1]) * float(scale_y) + float(offset_y)
        
        d.append(f"C {c1x:.1f} {c1y:.1f}, {c2x:.1f} {c2y:.1f}, {end_x:.1f} {end_y:.1f}")
        
    d.append("Z")
    return " ".join(d)

print("Helper script written successfully")
