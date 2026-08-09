# Hero 3D model

The hero scene looks for **`robot-face.glb`** in this folder. Until it exists,
`HeroScene` falls back to the original wireframe torus knot — the site works
either way, so a missing file is never a broken page.

## Getting the file

Sketchfab requires a signed-in account to download, so this can't be fetched
automatically.

1. Open <https://sketchfab.com/3d-models/humanoid-robot-face-1532b74a76dc43d18a4fc2c5ba1f2229>
2. **Download 3D Model** → choose **glTF (.glb)** — not .fbx or .obj, which
   `useGLTF` can't read
3. Save it here as exactly `robot-face.glb`

Vite serves `public/` from the site root, so the file resolves at
`/models/robot-face.glb`. No import, no rebuild — refresh and it appears.

## Licence — attribution is required

"Humanoid Robot Face" by **kito1704**, licensed **CC BY 4.0**.
Commercial use is permitted; crediting the author is not optional.

The credit is rendered in the site footer. If the model is ever swapped or
removed, update that line in `src/components/Footer.jsx` to match.

## If it looks wrong

The model is 91k triangles and arrives at the artist's own scale and pivot,
which can't be known until the file is present. Framing knobs are the three
constants at the top of `src/components/RobotFace.jsx`:

- `SCALE` — too small or filling the screen
- `POSITION` — off-centre or cropped
- `SPIN` — rotation speed in radians/sec
