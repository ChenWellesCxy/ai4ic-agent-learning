# AI4IC Agent Learning

面向 **AI for IC Design & Verification** 的全职学习与实践仓库。

结合 AI/深度学习基础与 DRAM 全定制电路验证经验，重点学习 Agent Engineering、EDA Tool Calling、Context Engineering、Verification Agent 与 Waveform Debug Agent，并沉淀可展示项目。

## 8-Week Roadmap

- Week 1–2: Agent foundations, context engineering, RAG, MCP and tool calling
- Week 3–4: SystemVerilog/SVA, formal verification and verification-agent loops
- Week 5–6: waveform context, automated debug and agent evaluation
- Week 7: full-custom / memory waveform debug agent
- Week 8: model serving, post-training concepts and production agent engineering

## Layout

```text
notes/                       # 学习笔记
ai-agent-book-labs/          # ai-agent-book 实验与 IC 场景改造
verification-agent/          # RTL / SVA / Formal Verification Agent
waveform-debug-agent/        # Full-custom / Memory Waveform Debug Agent
papers/                      # 论文阅读笔记
outputs/                     # 课表与阶段成果
docs/                        # 静态学习 Dashboard（GitHub Pages 源码）
```

## Current Artifact

- `outputs/ai4ic_8week_schedule/AI4IC_Agent_8Week_Study_Schedule.xlsx` — 8 周全职学习课表
- `docs/` — Excel 同步生成的静态学习 Dashboard；包含路线图、40 天课表、资源、里程碑和模型知识地图

## Web Dashboard

公开访问地址：

- https://chenwellescxy.github.io/ai4ic/

Dashboard 为纯静态 HTML/CSS/JavaScript，无后端依赖。每日状态、实际工时和复盘笔记只保存在当前浏览器的 `localStorage`；可用页面中的“导出进度 / 导入进度”在不同浏览器之间迁移。

## Principles

1. 每个 Agent 概念尽量映射到一个 IC/Verification workflow。
2. 仿真、Formal、波形分析等确定性工具作为 Agent 的 external verifier。
3. 优先建立可量化 Eval，而不是只展示 prompt demo。
4. 不提交公司 IP、内部 netlist、波形、spec、日志或其他敏感数据。
