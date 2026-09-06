# 16 周数字验证学习资料库

> 资料选择原则：优先 IEEE/Accellera 官方标准、工具官方文档、Verification Academy、成熟开源项目；商业培训只作为补充。资料以“能直接支撑本周 Lab”为优先，而不是资料越多越好。

## Week 1 — Digital Verification 全景
- Verification Academy：Verification Methodology / Verification Planning / Simulation & Debug / Coverage / Formal / CDC / RDC / UVM 主题入口。
- Verilator 官方文档：理解开源 RTL 编译仿真、lint、coverage、waveform 的统一实验环境。
- Lab：FIFO + self-checking TB。

## Week 2 — SystemVerilog
- IEEE 1800-2023 SystemVerilog Standard：语言权威参考，覆盖 RTL、testbench、coverage、assertion、OOP、constrained random。
- Doulos SystemVerilog TechNotes：适合查阅概念和示例。
- Lab：transaction / generator / driver / monitor / scoreboard。

## Week 3 — Simulation / TB Architecture
- Verification Academy：Simulation & Debug、Testbench Architecture、Functional Verification。
- Verilator 官方文档：建立轻量本地 simulation/lint/coverage 环境。
- Lab：FIFO self-checking TB + reference model。

## Week 4 — Constraint Random / Regression
- IEEE 1800-2023：randomization / constraints 的语言参考。
- Verification Academy：Functional Verification、Coverage、Regression 相关内容。
- Lab：Python regression runner + seed/reproducibility。

## Week 5–6 — UVM
- Verification Academy：UVM Basics、Components、Factory、Phasing、Driver、Monitor、Agent、Sequences、Config DB、Testbench Build。
- Accellera UVM：优先使用官方 UVM 文档/参考实现作为标准入口。
- Doulos：SystemVerilog/UVM 自学课程和 TechNotes 作为补充。
- Lab：从 FIFO UVM Agent → APB/AXI-Lite UVM Environment。

## Week 7 — Regression / Debug
- Verification Academy：UVM Debug、Simulation & Debug。
- Verilator coverage/reporting 文档：学习机器可读 coverage/result 数据。
- Lab：log parser + failure classification + regression summary。

## Week 8 — Coverage Closure
- Verification Academy：Coverage。
- Verilator coverage：支持 property、covergroup、FSM、line、toggle 等 coverage，并提供 coverage report/merge 能力。
- IEEE 1800-2023：Functional Coverage / covergroup 权威参考。
- Lab：coverage hole → root cause → new test。

## Week 9 — SVA
- IEEE 1800-2023：Assertion 语言权威参考。
- Verification Academy：SVA / UVM / Methodology 内容。
- Doulos：SystemVerilog Assertions 专题培训/资料。
- Lab：FIFO + AXI 50+ assertions。

## Week 10 — Formal
- SymbiYosys 官方文档：Yosys-based formal flow，支持 bounded/unbounded safety、cover 和 liveness。
- ZipCPU Formal Verification 系列：非常适合建立工程师视角的 Formal 思维和实际案例。
- Lab：FIFO formal + counterexample + bug fixing。

## Week 11 — Lint / CDC / RDC / Equivalence
- Verification Academy：CDC、RDC、Formal Verification、Methodology & Standards。
- IEEE 1800-2023：SystemVerilog semantics/reference。
- Lab：同一设计分别用 simulation / assertion / formal / CDC 思路分析。

## Week 12 — AXI / SoC Verification
- Verification Academy：Verification Planning、Functional Verification、UVM。
- 建议补充 AMBA 官方协议规范（AXI/APB/AHB），实际项目以公司授权版本为准。
- Lab：AXI-Lite register block + UVM + SVA + coverage。

## Week 13 — Emulation / FPGA
- Verification Academy：FPGA Verification、Methodology。
- Siemens Verification Academy 的相关专题用于建立 simulation/emulation/FPGA 分工认知。
- Lab：输出 Simulation / Emulation / FPGA capability matrix。

## Week 14 — GLS / Sign-off / Silicon
- Verification Academy：Methodology & Standards、Simulation & Debug。
- 结合公司实际工具文档学习 GLS/SDF/LEC/STA/DRC/LVS；商业 EDA 文档通常需要公司账号。
- Lab：Verification Sign-off Matrix。

## Week 15 — Python / cocotb
- cocotb 官方文档：Python coroutine-based cosimulation testbench，支持 SystemVerilog/VHDL RTL，并适合 CI/regression。
- Verilator 官方文档：适合作为开源本地 simulator/lint/coverage backend。
- Lab：用 cocotb 重做 FIFO/AXI-Lite。

## Week 16 — AI for Verification
本周没有单一“教材”，以工程组合为主：
- Spec → Verification Plan
- Spec → Test Generation
- Spec → SVA
- Coverage → Test Recommendation
- Log/Waveform → Root Cause
- Regression → Test Selection
- Formal Counterexample → Explanation
- Code/Test → Compile → Execute → Repair

建议把 AI Agent 与真实工具闭环，而不是只做“LLM 代码生成 Demo”。

---

# 官方/高价值入口

1. IEEE SystemVerilog 1800-2023  
   https://standards.ieee.org/ieee/1800/7743/

2. Verification Academy  
   https://verificationacademy.com/

3. cocotb Documentation  
   https://docs.cocotb.org/en/stable/

4. Verilator Documentation  
   https://verilator.org/guide/latest/

5. SymbiYosys Documentation  
   https://symbiyosys.readthedocs.io/en/latest/

6. ZipCPU Formal Verification  
   https://zipcpu.com/formal/formal.html

7. Doulos SystemVerilog/UVM Resources  
   https://www.doulos.com/knowhow/systemverilog/technote-downloads-and-videos/

# 资料使用规则

- **标准**：查语法/语义/规范时使用，不通读。
- **官方文档**：安装、API、工具行为时使用。
- **教程**：第一次学习概念时使用。
- **开源项目**：以 Lab 为中心，读代码而不是只看 README。
- **论文/博客**：用于理解方法和 AI for Verification 前沿，不替代基础方法学。
- **商业 EDA**：如果没有公司许可证/账号，不要为了学习路线强行购买；先用开源工具完成方法学训练。

# 资料质量分级

- A：标准/官方文档
- B：Verification Academy / 成熟工具官方教程
- C：成熟工程师博客/论文
- D：随机博客/视频，仅用于补充，不作为主教材
