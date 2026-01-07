# Mouse Overlays & Stream Tools

A collection of interactive overlays for OBS (Open Broadcaster Software) using p5.js, Cables.gl, and Broadcast Channels to synchronize mouse and keyboard data across browser sources.

## Core Concepts

### 1. Event Broadcasting
The project relies on a decentralized event system using the [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel). This allows multiple independent browser sources in OBS to share data without a central server.
- `mouse_move`: Sends `{x, y}` coordinates in desktop space.
- `mouse_click`: Sends click events with button info and state.
- `mouse_scroll`: Sends scroll delta information.
- `keyboard_event`: Sends key press details.
- `desktop_bounds`: Shares the virtual desktop dimensions for coordinate remapping.

### 2. Coordinate Remapping
Since OBS browser sources are often fixed resolutions (e.g., 1920x1080), but mouse events come in "Desktop Space" (which might span multiple monitors), we use `desktop_bounds` to remap incoming coordinates so they align correctly with the browser source's viewport.

## Key Projects

### Astro Bee (p5.js)
- **Location**: `src/astro_bee.html`
- **Description**: A 3D robot model ("Astro Bee") that floats around your screen.
- **Interactions**:
  - Follows the mouse position with smooth interpolation.
  - Oscillates in "zero-G".
  - Reacts to clicks with a random pitch/yaw rotation.
  - Zoom in/out using `+` and `-` keys.

### Fluid Simulation (Cables.gl)
- **Location**: `src/cables_flow_highlight.html`
- **Description**: A high-performance fluid simulation that reacts to mouse movement.
- **Developer Note**: Uses internal Cables variables (`MouseInX`, `MouseInY`, etc.) to drive the simulation state from external BroadcastChannel messages.

### Zoom Follow (App)
- **Location**: `example_output/zoom_follow.html`
- **Description**: A tool to automatically zoom and follow the mouse across multiple monitors in OBS.
- **Features**:
  - Links OBS sources to physical monitors.
  - Smoothly interpolates source transforms in OBS via WebSocket.
  - Provides a settings UI for configuring movement speed, zoom levels, and hotkeys.

## Getting Started

1. **Install OBS and OBS-WebSocket**: (Native in OBS 28+).
2. **Setup the Monitor**: Run a script (like `mouse_monitor_browserSource.py`) or use the provided HTML monitors to start broadcasting mouse/keyboard events.
3. **Add Browser Sources**:
   - Add `src/astro_bee.html` or `src/cables_flow_highlight.html` as a Browser Source in OBS.
   - Set the resolution to your canvas size (e.g., 1920x1080).
   - Check "Local file".
4. **Transparency**: All overlays are designed with transparent backgrounds.

## Developer Overview

- **`src/`**: Contains the source HTML and p5.js sketches.
- **`src/patches/`**: Contains exported Cables.gl patches.
- **`example_output/js/`**: Contains the logic for the Zoom Follow application.
  - `OBSManager.js`: Handles `obs-websocket-js` communication.
  - `Monitor.js`: Logic for monitor-to-source mapping.
  - `Settings.js`: Persistent configuration management.

### Adding a New Overlay
1. Create a new HTML file in `src/`.
2. Instantiate the necessary `BroadcastChannel` instances.
3. Add a listener to `mouseChannel.onmessage` and use the `remap()` function to convert coordinates to your window size.
4. Implement your visual logic (p5.js, Three.js, Canvas, etc.).

---
*Created with Google Gemini*
