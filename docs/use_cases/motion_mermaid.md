flowchart TD
    A[Task Goal<br/>What should the system do?] --> B[Motion Orientation<br/>What kind of movement should count as good movement?]
    B --> C[Embodied Motion Logic<br/>How would a body naturally generate this movement?]
    C --> D[Motion Control<br/>How can the system execute the movement?]
    D --> E[Motion Output<br/>Actual movement in the world]

    B1[Naturalness] --> B
    B2[Coordination] --> B
    B3[Continuity] --> B
    B4[Safety / Human-likeness] --> B

    C1[Axis Logic] --> C
    C2[Force Chain Logic] --> C
    C3[Inertial Logic] --> C
    C4[Preparatory Logic] --> C
    C5[Follow-through Logic] --> C

    D1[Trajectory Planning] --> D
    D2[Dynamic Compensation] --> D
    D3[Joint / Actuator Control] --> D
    D4[Balance / Stability] --> D

---
flowchart TD
    %% Core Flow
    A[Task Goal<br/>What should the system do?] --> B[Motion Orientation<br/>What kind of movement should count as good movement?]
    B --> C[Embodied Motion Logic<br/>How would a body naturally generate this movement?]
    C --> D[Motion Control<br/>How can the system execute the movement?]
    D --> E[Motion Output<br/>Actual movement in the world]

    %% B Module Branches
    B1[Naturalness] --> B
    B2[Coordination] --> B
    B3[Continuity] --> B
    B4[Safety / Human-likeness] --> B

    %% C Module Branches
    C1[Axis Logic] --> C
    C2[Force Chain Logic] --> C
    C3[Inertial Logic] --> C
    C4[Preparatory Logic] --> C
    C5[Follow-through Logic] --> C

    %% D Module Branches
    D1[Trajectory Planning] --> D
    D2[Dynamic Compensation] --> D
    D3[Joint / Actuator Control] --> D
    D4[Balance / Stability] --> D

    %% Styling for GitHub Rendering
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style E fill:#00ff00,stroke:#333,stroke-width:2px
    classDef logic fill:#e1f5fe,stroke:#01579b,stroke-width:1px
    class B,C,D logic
---
flowchart TD
    A[Task Goal<br/>What should the system do?] --> B[Motion Orientation<br/>What kind of movement should count as good movement?]
    B --> C[Embodied Motion Logic<br/>How would a body naturally generate this movement?]
    C --> D[Motion Control<br/>How can the system execute the movement?]
    D --> E[Motion Output<br/>Actual movement in the world]

    B1[Naturalness] --> B
    B2[Coordination] --> B
    B3[Continuity] --> B
    B4[Safety / Human-likeness] --> B

    C1[Axis Logic] --> C
    C2[Force Chain Logic] --> C
    C3[Inertial Logic] --> C
    C4[Preparatory Logic] --> C
    C5[Follow-through Logic] --> C

    D1[Trajectory Planning] --> D
    D2[Dynamic Compensation] --> D
    D3[Joint / Actuator Control] --> D
    D4[Balance / Stability] --> D
