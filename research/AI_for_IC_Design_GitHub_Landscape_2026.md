# AI for IC Design：GitHub 开源项目地图（2026）

> 调研日期：2026-08-08  
> 目标读者：从 DRAM / full-custom verification 转向 AI Agent / AI4EDA 的工程师  
> 范围：LLM/Agent、verification、RTL、EDA tool-use、physical design、analog/custom IC、SPICE、benchmark/data。

## 0. 先说结论

GitHub 上的 AI for IC Design 已经从“LLM 写 Verilog”明显走向 **Agent + EDA deterministic feedback**：LLM 负责规划、假设和工具选择，仿真、formal、综合、STA、SPICE 等工具负责提供可验证反馈。

当前开源成熟度大致是：

1. **RTL generation / repair / benchmark**：最成熟，数据集和 benchmark 最多。
2. **Digital verification / waveform debug agent**：快速增长，已经出现 testbench、SVA/formal、VCD waveform feedback、block-level verification agent。
3. **Physical design / ML4EDA**：传统 ML/RL 基础很深，OpenROAD 正在成为 Agent/LLM 最重要的开源工具底座之一。
4. **Analog / custom IC**：开源量明显少于数字，但 2025–2026 已出现 AnalogCoder、SPICEPilot、LEDRO、analog-agents、Virtuoso bridge、SPICE-in-the-loop 等路线。
5. **Memory / transistor-level waveform RCA**：公开项目仍很稀缺。这正是最值得利用 DRAM/full-custom verification 背景建立差异化的方向。

---

## 1. 最值得先收藏的索引仓库

| 仓库 | 类型 | 为什么值得看 | 对当前学习价值 |
|---|---|---|---|
| [chateda-ichip/Awesome-AI-for-Chip-Design](https://github.com/chateda-ichip/Awesome-AI-for-Chip-Design) | 全流程索引 | 从 spec 到 silicon，含 RTL、verification、physical、analog、benchmark；2026 内容更新较新 | **S** |
| [Thinklab-SJTU/Awesome-LLM4EDA](https://github.com/Thinklab-SJTU/Awesome-LLM4EDA) | LLM4EDA 索引 | LLM 生成、EDA agent、verification、analog 等分类清楚 | **S** |
| [thu-nics/awesome_ai4EDA](https://github.com/thu-nics/awesome_ai4EDA) | ML4EDA 索引 | 覆盖传统 ML/RL EDA：logic、physical、analog，适合补 LLM 之前的技术脉络 | **A** |
| [DfX-NYUAD/LLM4IC](https://github.com/DfX-NYUAD/LLM4IC) | LLM4IC 索引 | RTL、debug、formal/assertion、security 都有整理 | **A** |
| [OSCC-Project/awesome-AIEDA-works](https://github.com/OSCC-Project/awesome-AIEDA-works) | AI4EDA 索引 | 数据、AI EDA infrastructure、logic、physical、verification 都覆盖 | **A** |
| [phuocphn/Awesome-AnalogEDA-LLM](https://github.com/phuocphn/Awesome-AnalogEDA-LLM) | Analog LLM 索引 | 专门跟踪 LLM + Analog EDA | **A（与你相关）** |

如果只保留两个总入口，我会选 `Awesome-AI-for-Chip-Design` + `Awesome-LLM4EDA`。

---

## 2. Agentic EDA / Tool Calling：最该学的主线

### 2.1 ChatEDA

- Repo: [wuhy68/ChatEDA](https://github.com/wuhy68/ChatEDA)
- 核心：LLM agent 将自然语言任务拆解为 EDA tool/API 调用，公开仓库包含 ChatEDA-Bench（50 个任务）和 Python-EDA / OpenROAD 接口材料。
- 值得学：**plan → API/tool → observation → next action** 的经典 EDA Agent 结构。
- 局限：更偏数字 RTL-to-GDS / OpenROAD；不等于工业全芯片 signoff agent。
- 推荐：**S**。

### 2.2 OpenROAD MCP

- Repo: [The-OpenROAD-Project/OpenROAD-MCP](https://github.com/The-OpenROAD-Project/OpenROAD-MCP)
- 核心：OpenROAD 官方 MCP server，把 OpenROAD/ORFS 能力暴露给 MCP-compatible AI assistant。
- 值得学：这比“让 LLM 自己写 Tcl”更接近今天 Agent 工程的正确抽象——把 EDA 能力做成受控、可查询的工具。
- 可迁移到你的方向：完全可以照这个思路把 `run_spice / query_waveform / measure_timing / compare_runs` 做成 Memory Verification MCP。
- 推荐：**S+**。

### 2.3 MCP4EDA

- Repo: [NellyW8/MCP4EDA](https://github.com/NellyW8/MCP4EDA)
- 核心：MCP server 统一封装 Verilog synthesis、simulation、ASIC flow、waveform analysis。
- 值得学：工具 schema 如何设计、EDA execution 如何变成 Agent 能力。
- 推荐：**S（架构参考）**。

### 2.4 OpenROAD Agent / EDA Corpus

- Repos: [OpenROAD-Assistant/OpenROAD-Agent](https://github.com/OpenROAD-Assistant/OpenROAD-Agent), [OpenROAD-Assistant/EDA-Corpus](https://github.com/OpenROAD-Assistant/EDA-Corpus)
- 核心：围绕 OpenROAD 的 EDA script generation/self-correction；EDA Corpus 提供面向 physical-design tool interaction 的数据。
- 值得学：domain data + tool documentation + feedback loop，而不只是通用模型 prompt。
- 推荐：**A**。

---

## 3. RTL Generation：成熟，但不要把它当最终目标

### 3.1 AutoChip

- Repo: [shailja-thakur/AutoChip](https://github.com/shailja-thakur/AutoChip)
- 核心：spec + testbench → 生成 Verilog → Icarus Verilog compile/sim → 将错误反馈给 LLM → repair。
- 最值得学：**external verifier loop**。LLM 的“反思”不是验证，simulation result 才是验证证据。
- 推荐：**S（建议亲手跑）**。

### 3.2 VerilogCoder

- Repo: [NVlabs/VerilogCoder](https://github.com/NVlabs/VerilogCoder)
- 核心：graph-based planning + AST-based waveform tracing；输入 RTL spec/testbench，输出通过验证的 Verilog。
- 与你最相关的点：它已经把 **waveform tracing** 当作 Agent 的结构化 debug 工具，而不是直接把整份 VCD 喂给模型。
- 推荐：**S+**。

### 3.3 RTL-Coder

- Repo: [hkust-zhiyao/RTL-Coder](https://github.com/hkust-zhiyao/RTL-Coder)
- 核心：面向 Verilog 的数据构造、训练和开源模型路线。
- 值得学：如果未来要判断“prompt/RAG/tool 已经不够，是否需要 domain SFT”，这是很好的一条参考线。
- 推荐：**A**。

### 3.4 RTLLM / VerilogEval

- Repos: [hkust-zhiyao/RTLLM](https://github.com/hkust-zhiyao/RTLLM), [NVlabs/verilog-eval](https://github.com/NVlabs/verilog-eval)
- 核心：RTL generation benchmark / evaluation。
- 值得学：不要只评价“生成代码能 compile”；需要 functional correctness、pass@k、任务难度和可复现 testbench。
- 推荐：**S（做 Eval 必看）**。

---

## 4. Verification / Debug：与你最相关的数字验证路线

### 4.1 AutoBench → CorrectBench → ConfiBench

- Repos: [AutoBench/AutoBench](https://github.com/AutoBench/AutoBench), [AutoBench/CorrectBench](https://github.com/AutoBench/CorrectBench), [AutoBench/ConfiBench](https://github.com/AutoBench/ConfiBench)
- 演进：自动 testbench generation → functional self-validation/self-correction → ensemble/masking。
- 值得学：生成 TB 的真正难点不是“写出语法”，而是 **如何证明 TB 自己是可信的**。
- 推荐：**S**。

### 4.2 Assertion / SVA benchmark

- Repo: [achieve-lab/assertion_data_for_LLM](https://github.com/achieve-lab/assertion_data_for_LLM)
- 核心：AssertionBench，用量化 benchmark 测 LLM assertion generation。
- 相关工作入口：`Awesome-AI-for-Chip-Design` 已继续跟踪 2025–2026 的 DeepAssert、SpecAlign、RTL-grounded SVA 等工作。
- 对你的意义：未来做 Verification Agent Eval 时，可以借鉴“语法正确 ≠ verification value”的评价方法。
- 推荐：**A+**。

### 4.3 VeriDebug / Agentic waveform debugging（新兴）

- Repo: [hernantech/veridebugger](https://github.com/hernantech/veridebugger)
- 核心：compile → simulate → VCD waveform analysis → fix/optimize 的 Agent loop，同时支持 testbench generation。
- 值得学：这是与你计划中的 waveform-debug agent 最接近的公开数字 demo 之一。
- 注意：项目定位和工程成熟度需与 NVIDIA/学术 benchmark 区分看待，不应因为“能自动 debug”就直接外推到工业复杂 SoC。
- 推荐：**S（架构参考）**。

### 4.4 2026 verification agent 观察清单

`Awesome-AI-for-Chip-Design` 在 2026 条目中已收录/跟踪：

- UCAgent：block-level functional verification agent
- SpecLoop：RTL-to-spec + formal feedback loop
- SpecAlign：SVA generation 的语义对齐
- Structured Testbench Generation
- RTL-grounded assertion generation

这些项目/论文很适合作为后续每月追踪项。与其只看“生成能力”，更应该观察它们有没有引入 simulator/formal/coverage/mutation 等 external verifier。

---

## 5. Physical Design / ML4EDA：理解工业 AI4EDA 的另一半

### 5.1 AlphaChip / Circuit Training

- Repo: [google-research/circuit_training](https://github.com/google-research/circuit_training)
- 核心：用 distributed deep RL 进行 chip floorplanning，开源框架对应经典 chip placement 工作。
- 值得学：AI for EDA 并不是从 LLM 开始；PPA/search/optimization 是更早也更成熟的一条路线。
- 推荐：**A（理解路线，不必作为你第一复现项目）**。

### 5.2 CircuitOps

- Repo: [NVlabs/CircuitOps](https://github.com/NVlabs/CircuitOps)
- 核心：把详细 netlist/EDA 数据转成 labeled property graph + relational IR，用于 dataset generation 和 GAI/ML circuit optimization。
- 对 Agent 的启示：IC context 不能只靠 embedding/RAG；**hierarchy/connectivity/graph IR** 往往比把 netlist 当普通文本更重要。
- 推荐：**S（强烈建议研究数据表示思想）**。

### 5.3 DREAMPlace

- Repo: [limbo018/DREAMPlace](https://github.com/limbo018/DREAMPlace)
- 核心：基于深度学习框架/GPU 的 VLSI placement acceleration。
- 推荐：**B+（了解 ML4EDA 历史和 optimization 表达）**。

### 5.4 OpenROAD

- Repo: [The-OpenROAD-Project/OpenROAD](https://github.com/The-OpenROAD-Project/OpenROAD)
- 核心：开源 RTL-to-GDS 基础设施，本身不是“LLM 项目”，但已经成为大量 AI4EDA Agent 的真实执行环境。
- 推荐：**S（把它当 EDA sandbox，而不是 AI 模型）**。

---

## 6. Analog / Custom IC / SPICE：你的差异化区域

### 6.1 AnalogCoder

- Repo: [laiyao1/AnalogCoder](https://github.com/laiyao1/AnalogCoder)
- 核心：training-free LLM analog design agent，把 analog design formulation 转为 Python code generation。
- 值得学：analog domain 如何把连续参数优化、design knowledge 和 code/tool execution 接起来。
- 推荐：**S**。

### 6.2 AutoCkt

- Repo: [ksettaluri6/AutoCkt](https://github.com/ksettaluri6/AutoCkt)
- 核心：deep RL 做 analog circuit sizing；公开流程可配 NGSpice，论文也使用过 Spectre 场景。
- 值得学：PVT/spec/reward/circuit sizing 的 formalization。
- 推荐：**A**。

### 6.3 LEDRO

- Repo: [dimplekochar/LEDRO](https://github.com/dimplekochar/LEDRO)
- 核心：LLM-enhanced analog design-space reduction + optimization。
- 值得学：LLM 不必直接“设计晶体管”，可以先利用 domain knowledge 缩减搜索空间，再交给数值优化/仿真评价。
- 推荐：**A**。

### 6.4 SPICEPilot

- Repo: [ACADLab/SPICEPilot](https://github.com/ACADLab/SPICEPilot)
- 核心：LLM 生成 SPICE netlist，并使用 PySpice 做 circuit simulation / evaluation。
- 值得学：最小可复现的 `LLM → SPICE → simulation feedback` 框架。
- 推荐：**S（与你的项目很接近）**。

### 6.5 analog-agents

- Repo: [Arcadia-1/analog-agents](https://github.com/Arcadia-1/analog-agents)
- 核心：面向 AI-native analog IC design 的 skills 框架，覆盖 architecture、sizing、verification、post-layout audit 等生命周期。
- 值得学：2026 很新的 **skill-based EDA agent** 组织方式，而不是把所有知识塞进一个 system prompt。
- 推荐：**S（重点观察）**。

### 6.6 Virtuoso Bridge Lite

- Repo: [Arcadia-1/virtuoso-bridge-lite](https://github.com/Arcadia-1/virtuoso-bridge-lite)
- 核心：让 LLM Agent 驱动 Cadence Virtuoso，本地或远程执行 analog/mixed-signal design flow。
- 值得学：商业 EDA 环境如何与 Agent 隔离、桥接、暴露有限能力。
- 注意：实际使用仍依赖合法的 Cadence/Virtuoso 环境与许可。
- 推荐：**S+（与你未来公司内部落地高度相关）**。

### 6.7 SpiceXplorer

- Repo: [MacAnalog/SpiceXplorer](https://github.com/MacAnalog/SpiceXplorer)
- 核心：声明式 YAML + SPICE-in-the-loop optimization + scoring/report。
- 状态：GitHub metadata 显示仓库已 archived（调研日 2026-08-08）。
- 价值：即使不直接采用代码，其 `spec → sweep/optimization → scoring → checkpoint/report` 结构非常适合你的 memory margin/corner agent。
- 推荐：**A（读架构，不建议作为长期依赖）**。

### 6.8 ALIGN / CedarSim：不是 LLM Agent，但很重要

- [ALIGN-analoglayout/ALIGN-public](https://github.com/ALIGN-analoglayout/ALIGN-public)：从 netlist 自动生成 analog layout。
- [CedarEDA/CedarSim.jl](https://github.com/CedarEDA/CedarSim.jl)：现代 analog circuit simulator，支持 SPICE/Spectre netlist、Verilog-A、transient/AC/noise，并强调 differentiability。
- 意义：做 AI for analog/custom 时，真正稀缺的是**可编程、可查询、可自动验证的 execution environment**，不只是 LLM。

---

## 7. Welles：我建议你优先复现的 Top 10

结合“AI 硕士 + DRAM full-custom verification + 即将做 AI Agent 落地”，优先级不是按 GitHub 热度排，而是按对你未来工作的迁移价值排：

| 排名 | 项目 | 你要学什么 | 建议动作 |
|---:|---|---|---|
| 1 | OpenROAD-MCP | MCP tool schema、EDA tool boundary | 读源码 + 本地跑通 MCP |
| 2 | VerilogCoder | AST + waveform tracing + planning | 复现 3–5 个 fail→fix case |
| 3 | AutoChip | simulation feedback repair loop | 自己替换一种 LLM/provider |
| 4 | CircuitOps | graph/hierarchy/connectivity context | 重点学 IR，不追求完整 flow |
| 5 | AutoBench/CorrectBench | verification artifact 的 self-validation | 做 mutation/eval 对比 |
| 6 | SPICEPilot | LLM→SPICE→simulation loop | 改成小型 SRAM/sense amp toy case |
| 7 | AnalogCoder | analog agent problem formulation | 读代码并抽象 tool interface |
| 8 | analog-agents | skill 化的 analog domain knowledge | 研究 skill 分层与 context loading |
| 9 | virtuoso-bridge-lite | commercial EDA bridge / security boundary | 研究架构；不要放公司 IP 到外部服务 |
| 10 | ChatEDA | general EDA planner/executor | 对比 MCP 架构与旧式 Python-API agent |

### 不建议你花太多时间的事情

- 单纯刷“自然语言 → Verilog”prompt 技巧。
- 为了 Multi-Agent 而 Multi-Agent。
- 一开始就训练自己的 Chip LLM。
- 把整份 VCD/FSDB 直接塞给模型并称为 waveform debug。
- 只以 syntax/compile pass rate 作为 verification agent 的指标。

---

## 8. 从这些项目抽象出的 AI4IC Agent 技术栈

```text
Design / Verification Intent
          ↓
Planner / Reasoning Model
          ↓
Domain Context
  ├─ spec / docs / prior bugs (RAG)
  ├─ hierarchy / connectivity / AST / graph
  └─ waveform summaries / measurements
          ↓
Tool Layer (MCP / typed APIs)
  ├─ simulation / SPICE
  ├─ formal / SVA
  ├─ synthesis / STA / P&R
  ├─ waveform query
  └─ sweep / corner / optimization
          ↓
Deterministic Evidence
          ↓
Hypothesis → Re-run → Compare → RCA
          ↓
Eval / Audit / Human Review
```

对你的最终项目，最值得做的不是复制其中任何一个，而是把上面的结构迁移到 transistor-level / memory verification：

```text
Memory / Full-Custom Waveform Debug Agent

test fail
→ identify suspect path/signals
→ structured waveform query
→ pass/fail or corner diff
→ timing/margin measurement
→ hypothesis
→ targeted SPICE re-run / sweep
→ evidence check
→ RCA report with traceable evidence
```

这里真正的技术护城河是：**让模型在海量 analog waveform / hierarchy / corner data 上只获取“当前决策真正需要的证据”，并用仿真结果约束推理。**

---

## 9. 建议把这些项目映射到现有 8 周学习计划

| 周 | 重点 repo |
|---|---|
| W1 Agent | ChatEDA、AutoChip |
| W2 MCP / Context | OpenROAD-MCP、MCP4EDA |
| W3 RTL / Verification | VerilogCoder、VerilogEval、RTLLM |
| W4 TB / Formal / SVA | AutoBench、CorrectBench、AssertionBench |
| W5 Waveform / Debug | VerilogCoder、VeriDebug + 自己实现 waveform query tool |
| W6 Eval | VerilogEval/RTLLM 的 benchmark 思想 + mutation / RCA metrics |
| W7 Full-custom | SPICEPilot、AnalogCoder、AutoCkt、analog-agents |
| W8 Production | Virtuoso bridge、OpenROAD-MCP 的权限/工具边界设计 |

---

## 10. 继续追踪的 2026 信号

1. **MCP / skill 化 EDA**：OpenROAD-MCP、analog-agents、Virtuoso bridge 表明 EDA 正在被封装成 Agent-native tools/skills。
2. **Verification 从生成走向自验证**：testbench/self-correction、formal feedback、assertion benchmark、mutation/eval 会比“生成看起来正确的 SVA/TB”更重要。
3. **Structured circuit context**：AST、graph、hierarchy、connectivity 会持续替代“把所有 RTL/netlist 当文本 RAG”的粗糙方案。
4. **Waveform/debug 仍是机会区**：已有 VCD/RTL demo，但面向 SPICE/analog/memory 的公开高质量 RCA Agent 仍稀缺。
5. **EDA engine 是 verifier**：未来高价值系统的核心不是 LLM 自我反思，而是能否便宜、稳定、可审计地调用 simulator/formal/STA/SPICE 并闭环。

---

## 11. 本次调研主要来源

- [Awesome AI for Chip Design](https://github.com/chateda-ichip/Awesome-AI-for-Chip-Design)
- [Awesome LLM4EDA](https://github.com/Thinklab-SJTU/Awesome-LLM4EDA)
- [AI4EDA](https://github.com/thu-nics/awesome_ai4EDA)
- [LLM4IC](https://github.com/DfX-NYUAD/LLM4IC)
- [ChatEDA](https://github.com/wuhy68/ChatEDA)
- [AutoChip](https://github.com/shailja-thakur/AutoChip)
- [VerilogCoder](https://github.com/NVlabs/VerilogCoder)
- [AutoBench](https://github.com/AutoBench/AutoBench)
- [CorrectBench](https://github.com/AutoBench/CorrectBench)
- [CircuitOps](https://github.com/NVlabs/CircuitOps)
- [AlphaChip / Circuit Training](https://github.com/google-research/circuit_training)
- [OpenROAD-MCP](https://github.com/The-OpenROAD-Project/OpenROAD-MCP)
- [AnalogCoder](https://github.com/laiyao1/AnalogCoder)
- [AutoCkt](https://github.com/ksettaluri6/AutoCkt)
- [SPICEPilot](https://github.com/ACADLab/SPICEPilot)
- [analog-agents](https://github.com/Arcadia-1/analog-agents)
- [Virtuoso Bridge Lite](https://github.com/Arcadia-1/virtuoso-bridge-lite)
- [LEDRO](https://github.com/dimplekochar/LEDRO)
- [CedarSim](https://github.com/CedarEDA/CedarSim.jl)
- [ALIGN](https://github.com/ALIGN-analoglayout/ALIGN-public)

### 说明

- 本文优先收录有公开代码、benchmark、tooling 或可明确复现方法的项目；纯论文只在能解释趋势时出现。
- “S/A/B”是针对当前个人学习目标的推荐级别，不代表论文/项目的学术排名。
- GitHub 项目变化很快，尤其 2026 年的 Agent/MCP 项目，应以仓库当前 README、license、release 和 commit 为准。

