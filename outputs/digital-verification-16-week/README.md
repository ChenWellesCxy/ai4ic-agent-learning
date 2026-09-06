# 16 周数字 IC Verification → AI for Verification 学习计划

> 定位：基于「全定制 DRAM 设计验证 + 模拟波形 Debug + AI 背景」，系统补齐业内 Digital Verification 方法，并以 AI for Verification 为终点。
>
> 建议投入：每周 10–15 小时。工作日 1–1.5h，周末 3–4h。原则：40% 理论 / 40% Lab / 20% AI 化思考。
>
> **学习目标不是成为普通 UVM 工程师，而是能够看到一份 Spec 后，设计 Verification Plan，选择 Simulation / SVA / Formal / Lint / CDC / Emulation 等方法，并判断哪些环节适合 AI Agent 自动化。**

---

## 总体路线

| 周 | 主题 | 核心产出 | AI 方向 |
|---|---|---|---|
| 1 | Digital DV 全景 + 数字基础 | Verification Map + FIFO 初版 | Spec → Verification Map |
| 2 | SystemVerilog | SV Transaction/TB | Code Generation |
| 3 | Simulation + TB Architecture | Self-checking FIFO TB | Test Generation |
| 4 | Constraint Random + Regression | Regression Framework | Test Selection |
| 5 | UVM Architecture | UVM Agent | UVM Generation |
| 6 | UVM Advanced | 完整 UVM Env | Agentic TB Construction |
| 7 | Debug / Regression | 自动日志分析 | AI Debug |
| 8 | Coverage Closure | Functional Coverage | Coverage Agent |
| 9 | SVA / Assertion | 50+ Assertions | Assertion Generation |
| 10 | Formal Verification | FIFO Formal Lab | Property/Counterexample Agent |
| 11 | Lint / CDC / RDC / Equivalence | Static DV Lab | Static Analysis Agent |
| 12 | AXI / SoC Verification | AXI-Lite UVM Project | SoC Scenario Generation |
| 13 | Emulation / FPGA | Acceleration Knowledge Map | Scenario Acceleration |
| 14 | GLS / Sign-off / Silicon | Full Flow Map | Sign-off Agent |
| 15 | Python / cocotb / Infra | Python DV Framework | Verification Coding Agent |
| 16 | AI for Verification Capstone | AI Verification Agent | End-to-End Agent |

---

# Week 1 — Digital Verification 全景

### 目标
建立完整的 Verification Knowledge Map，不急着学 UVM。

### Day 1
- Spec → Verification Plan → Test → Checker → Coverage → Debug → Regression → Sign-off
- 把你现有 DRAM 验证流程映射到 Digital DV。

### Day 2
- RTL、Combinational / Sequential Logic
- FSM、FIFO、Pipeline
- Reset / Clock

### Day 3
- Setup / Hold
- Clock Domain
- Metastability
- Synchronizer
- Async FIFO

### Day 4
比较：
- Simulation
- Formal
- Lint
- CDC/RDC
- Equivalence
- Emulation

### Day 5
建立 `notes/verification-methodology/verification-map.md`。

### Weekend Lab
实现一个简单 FIFO RTL，并写最小 testbench。

### 验收
能够解释：**为什么一个数字芯片不能只靠 Simulation 验证。**

### AI 思考
如果给 LLM 一份 Spec，能否自动产生 Verification Method Matrix？

---

# Week 2 — SystemVerilog

### Day 1
- logic / bit / wire
- enum / struct / typedef
- package / interface

### Day 2
- array / queue / dynamic array / associative array

### Day 3
- class / object / inheritance / virtual / polymorphism

### Day 4
- randomize()
- constraint
- inside
- dist
- solve before

### Day 5
- fork/join
- event
- mailbox
- semaphore
- process

### Weekend Lab
不使用 UVM，自己实现：
`transaction → generator → driver → monitor → scoreboard`

### 验收
能够独立阅读常见 SV verification code。

### AI 思考
让 LLM 从 transaction 定义自动生成 driver/monitor skeleton，然后人工 review。

---

# Week 3 — Simulation & Testbench Architecture

### 学习
- Directed Test
- Random Test
- Constrained Random
- Error Injection
- Corner Case
- Self-checking
- Reference Model
- Scoreboard

### Day 1
Reference Model

### Day 2
Scoreboard

### Day 3
Monitor / transaction reconstruction

### Day 4
Error injection / corner cases

### Day 5
Test organization

### Weekend Lab
完成 FIFO Verification Environment：
- Directed
- Random
- Scoreboard
- Reference Model
- Error Injection

### 验收
制造一个 RTL bug，TB 能自动报错而不是靠人工看 waveform。

### AI 思考
LLM 如何从 Spec 生成 test scenarios？

---

# Week 4 — Constraint Random + Regression

### 学习
- Constraint
- Seed
- Reproducibility
- Distribution
- Regression
- Smoke / Sanity / Random / Stress / Nightly

### Weekend Lab
建立 Python regression runner：

`compile → run → log → parse → PASS/FAIL → summary`

保存：
- seed
- test
- runtime
- result
- failure message

### 验收
一次命令能够运行至少 20 个 testcase 并生成 summary。

### AI 思考
做一个简单 Test Selection Agent：
输入历史失败/覆盖率数据 → 推荐下一批测试。

---

# Week 5 — UVM Architecture

### 学习
- uvm_object / uvm_component
- sequence_item
- sequence
- sequencer
- driver
- monitor
- agent

### Weekend Lab
把 Week 3 FIFO TB 改造成 UVM Agent。

### 验收
能够画出并解释：

`test → sequence → sequencer → driver → DUT → monitor → scoreboard`

### AI 思考
LLM 根据 interface/spec 自动生成 UVM skeleton。

---

# Week 6 — UVM Advanced

### 学习
- Environment
- Virtual Sequence
- Virtual Sequencer
- TLM
- Analysis Port
- Factory
- Config DB
- Phase
- Objection
- Register Model

### Weekend Lab
完成一个 APB 或 AXI-Lite UVM Environment。

必须包含：
- Agent
- Sequence
- Driver
- Monitor
- Scoreboard
- Coverage
- Assertion

### 验收
能解释每个 UVM 组件为什么存在，而不是只会套模板。

### AI 思考
从“代码生成”升级到“根据验证需求生成 TB architecture”。

---

# Week 7 — Regression / Debug / Automation

### 学习
- UVM report
- Simulation log
- Seed replay
- Waveform debug
- Failure classification
- Regression triage

### Weekend Lab
实现：
`regression → failure database → error clustering → summary`

至少把 failure 分成：
- compile
- timeout
- assertion
- scoreboard
- DUT crash
- infrastructure

### AI 思考
建立 **AI Log Debug Agent**：
`log + test + seed + RTL context → failure classification + suspected root cause`

---

# Week 8 — Coverage Closure

### 学习
Code Coverage：
- Line
- Branch
- Condition
- Toggle
- FSM

Functional Coverage：
- covergroup
- coverpoint
- bins
- cross
- illegal_bins / ignore_bins

### Weekend Lab
给 AXI/FIFO 加 Functional Coverage。

目标：
- command coverage
- address coverage
- state coverage
- corner case coverage
- cross coverage

然后人为制造 coverage hole。

### 验收
能够回答：
**Coverage 低，是 Test 不够、Constraint 限制、Unreachable、RTL dead code 还是 Coverage model 错误？**

### AI 思考
AI Coverage Closure Agent：
`coverage report + RTL + test history → coverage hole analysis → new test recommendation`

---

# Week 9 — SVA / Assertion

### 学习
- immediate assertion
- concurrent assertion
- sequence
- property
- assert / assume / cover
- |-> / |=> 
- ##1 / ##[1:5]
- throughout / within / until
- disable iff

### Weekend Lab
针对 FIFO + AXI 写 **50+ Assertions**：
- reset
- handshake
- FIFO overflow
- FIFO underflow
- valid/ready
- FSM transition
- protocol rules

### 验收
制造至少 10 个 bug，让 assertion 自动抓住。

### AI 思考
建立 Assertion Loop：

`Spec → SVA → Compile → Sim/Formal → Counterexample → Review → Refine`

---

# Week 10 — Formal Verification

### 学习
- Property Checking
- Model Checking
- Safety
- Liveness
- Bounded / Unbounded
- Assumption
- Cover
- Counterexample
- Cone of Influence
- Induction
- Equivalence

### Weekend Lab
用开源 Formal flow 做 FIFO：
- assert
- assume
- cover
- counterexample
- bug fixing

### 验收
能清楚解释：
**Simulation 的“跑过”与 Formal 的“证明”有什么区别。**

### AI 思考
Formal Agent：
`Spec → Property → Formal → Counterexample → Explanation → Fix suggestion`

---

# Week 11 — Lint / CDC / RDC / Equivalence

### 学习

| 方法 | 核心问题 |
|---|---|
| Lint | RTL 结构/编码问题 |
| CDC | Clock Domain Crossing |
| RDC | Reset Domain Crossing |
| LEC | Logic Equivalence |
| Formal | Property / state-space |
| Simulation | Dynamic behavior |

重点掌握：
- 2FF synchronizer
- handshake synchronizer
- pulse synchronizer
- async FIFO
- reset synchronization
- RTL ↔ Netlist equivalence

### Weekend Lab
找一个存在 CDC/Reset/RTL issue 的小设计，分别分析：
**Lint → CDC/RDC → Formal/Assertion → Simulation**

### AI 思考
AI Static Analysis / Fix Recommendation。

---

# Week 12 — AXI / SoC Verification

### 学习
AMBA：
- APB
- AHB
- AXI
- AXI-Lite
- AXI-Stream

重点：
- AW / W / B / AR / R
- valid / ready
- backpressure
- outstanding transaction
- ordering
- burst

### Weekend Capstone Part 1
完成：
**AXI-Lite Register Block Verification**

要求：
- UVM
- Scoreboard
- Coverage
- SVA
- Regression

### AI 思考
如果 DUT 是 AI Accelerator：
- DMA
- Memory
- Interrupt
- Register
- Compute
应该如何设计 SoC verification scenarios？

---

# Week 13 — Emulation / FPGA Acceleration

### 学习

Simulation：
- 精细 debug
- coverage
- assertion
- corner case

Emulation：
- 大规模 SoC
- 长时间运行
- software workload

FPGA Prototype：
- early software
- system validation

了解：
- Palladium
- Veloce
- ZeBu
- FPGA prototype

### Weekend
输出：
`notes/verification-methodology/acceleration.md`

画出：
**Simulation → Emulation → FPGA → Silicon**

### AI 思考
AI 如何根据 workload 自动选择：
Simulation / Emulation / FPGA？

---

# Week 14 — GLS / Sign-off / Silicon

### 学习完整链路：

`RTL → Synthesis → Netlist → P&R → STA → SDF → GLS → Tape-out → Silicon`

理解：
- Gate-Level Simulation
- SDF
- STA
- LEC
- DRC
- LVS
- Post-Silicon Validation

### Weekend Lab
不要追求工具熟练，做一张：
**Verification Sign-off Matrix**

例如：
- Lint
- CDC
- RDC
- Formal
- Assertion
- Functional Coverage
- Code Coverage
- Regression
- GLS

### 验收
看到一个项目能够判断：
**当前阶段是什么、应该用什么验证方法、sign-off 条件是什么。**

### AI 思考
Sign-off Agent：
`reports → risk analysis → missing evidence → sign-off recommendation`

---

# Week 15 — Python / cocotb / Verification Infrastructure

### 学习
- Python verification
- cocotb
- pytest
- log parsing
- regression orchestration
- YAML/JSON test configuration
- CI

### Weekend Lab
用 Python/cocotb 重做 FIFO 或 AXI-Lite Verification。

对比：
**UVM vs cocotb**

输出：
- 适用场景
- 优缺点
- debug体验
- 可维护性
- AI coding friendliness

### AI 思考
Verification Coding Agent：
`requirement → Python/SV test code → compile → test → repair`

---

# Week 16 — AI for Verification Capstone

## 最终项目

选择：
**AXI-Lite / FIFO / DMA 小型 IP**

建立：

```
SPEC
 ↓
Verification Plan
 ↓
Test Generation
 ↓
UVM / cocotb
 ↓
SVA
 ↓
Simulation
 ↓
Formal
 ↓
Coverage
 ↓
Regression
 ↓
Debug
 ↓
AI Agent
```

### Agent 1 — Spec Agent
输入 Spec：
- requirements
- interfaces
- protocols

输出：
- verification items
- corner cases
- verification matrix

### Agent 2 — Test Agent
输出：
- directed tests
- random constraints
- test scenarios

### Agent 3 — Assertion Agent
输出：
- SVA
- protocol checks

### Agent 4 — Coverage Agent
输入 coverage：
- 找 hole
- 推荐 test
- 推荐 cross

### Agent 5 — Debug Agent
输入：
- log
- waveform summary
- assertion failure
- seed

输出：
- failure classification
- suspected root cause
- debug path

### Agent 6 — Regression Agent
自动：
- 选择 test
- 运行
- 分析
- 聚类 failure
- 汇总结果

---

# 最终仓库结构

```
AI4IC Agent Learning/
│
├── notes/
│   └── verification-methodology/
│       ├── verification-map.md
│       ├── simulation.md
│       ├── uvm.md
│       ├── coverage.md
│       ├── sva.md
│       ├── formal.md
│       ├── cdc-rdc.md
│       ├── soc-verification.md
│       └── acceleration.md
│
├── verification-agent/
│   ├── spec-agent/
│   ├── test-agent/
│   ├── assertion-agent/
│   ├── coverage-agent/
│   ├── debug-agent/
│   └── regression-agent/
│
├── waveform-debug-agent/
│
├── labs/
│   ├── week01-fifo/
│   ├── week02-systemverilog/
│   ├── week03-simulation/
│   ├── week04-regression/
│   ├── week05-uvm/
│   ├── week08-coverage/
│   ├── week09-sva/
│   ├── week10-formal/
│   ├── week11-static/
│   ├── week12-axi/
│   └── week15-cocotb/
│
└── outputs/
    └── digital-verification-16-week/
        ├── README.md
        ├── DAILY_CHECKLIST.md
        └── PROGRESS.md
```

---

# 16 周结束时的能力标准

### Level 1 — 能看懂
- SV
- UVM
- SVA
- Coverage
- Formal
- CDC/RDC

### Level 2 — 能自己做
- Testbench
- UVM Agent
- Scoreboard
- Coverage
- Assertion
- Regression
- Formal properties

### Level 3 — 能做完整 IP Verification
- Spec
- Verification Plan
- TB
- Test
- Checker
- Coverage
- Regression
- Debug
- Sign-off

### Level 4 — AI for Verification
能够把：

**Spec → Plan → Test → Assertion → Simulation/Formal → Coverage → Debug → Regression**

拆成可被 Agent 调度、调用工具、验证结果和自我修复的闭环。

---

## 你的专属能力迁移

你的 DRAM 全定制验证经验不要丢，而要作为优势保留：

| 你已有经验 | 本计划对应 |
|---|---|
| Circuit behavior | RTL behavior |
| SPICE simulation | RTL simulation |
| Waveform debug | Digital waveform debug |
| Corner validation | Constraint/random/corner |
| Golden behavior | Reference Model |
| 手工波形判断 | Scoreboard / Assertion |
| 全芯片验证 | SoC Verification |
| PVT / corner | Verification scenario |
| AI 背景 | AI Agent / automation |

因此最终定位不是“转行成为普通数字验证工程师”，而是：

> **Full-custom DRAM Verification → Digital Verification Methodology → AI for Verification / AI for EDA**
