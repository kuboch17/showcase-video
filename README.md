# Remotion video

Spustenie: `start.cmd`, editor http://localhost:3001. Export: `render.cmd`.

Portrét 1080 × 1920, 30 fps, obe videá 1,1×. Hlavný záber 4:3 je predvolene v strede. Synchronizované rozmazané pozadie, tmavá vineta, jemné zoomy a tri krátke biele miesta na budúci footage. Štyri CBA screenshoty sú vložené.

- `src/captions.json`: krátke titulky v časoch zdrojov.
- `src/showcases.json`: ukážky v časoch zdrojov.
- `SHOWCASE_PLAN.md`: aktuálny plán a návod.
- `titulky.srt`: export titulkov pre aktuálny strih a rýchlosť.

Props: `introStart`, `introSeconds`, `mainStart`, `mainSeconds`, `audioVolume`, `fadeEdges`, `subtitles`, `subtitleSize` (60 px), `showcase`. Rýchlosť 1,1× je nastavená v `src/Root.tsx`.
