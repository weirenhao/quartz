---
date: 2025-02-17 17:29
share: "true"
updated: 2025-02-18 11:17
---

#### TC_B_01_CS

验证充电桩是否能够按照开放式充电点协议（OCPP）规范中所描述的方式执行启动机制

验证  Execute Reusable State Booted

- A message to report the state of a connector has been received for all connectors.

TC_B_02_CS

充电桩冷启动 - 待处理状态

验证充电桩是否能够正确处理启动机制的待处理状态。启动机制允许充电桩在启动时向充电站管理系统（CSMS）提供一些关于该充电桩的一般信息，并且它允许充电桩请求是否被允许开始发送其他开放式充电点协议（OCPP）消息。充电站管理系统（CSMS）可以通过在启动通知响应中返回 “待处理（Pending）” 状态来暂时中止充电桩的运行。在此期间，充电站管理系统（CSMS）能够从充电桩检索和设置配置。

|      |                                                                                                                                       |                                                                                                                                                                     |                                                                                                      |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 步骤   | 充电站 (Charging Station)                                                                                                                | CSMS (OCTT)                                                                                                                                                         | 预期结果 (Expected Result)                                                                               |
| 前置条件 | 手动操作：重启充电站。                                                                                                                           |                                                                                                                                                                     | -                                                                                                    |
| 1    | 发送 BootNotificationRequest                                                                                                            |                                                                                                                                                                     | 充电站正确发送 BootNotificationRequest 消息。                                                                  |
| 2    |                                                                                                                                       | 响应 BootNotificationResponse，状态为 Pending，心跳间隔为 <Configured heartbeatinterval>                                                                                        | CSMS (OCTT) 正确响应 BootNotificationResponse 消息，消息状态为 Pending，并且包含配置的心跳间隔。                              |
| 3    |                                                                                                                                       | 发送 SetVariablesRequest，包含: <br> - variable.name = "Offline Threshold" <br> - component.name = "OCPPCommCtrlr" <br> - attributeValue = "300" <br> - attributeType 省略 | CSMS (OCTT) 正确发送 SetVariablesRequest 消息，目标是设置 "OCPPCommCtrlr" 组件下名为 "Offline Threshold" 的变量值为 "300"。 |
| 4    | 响应 SetVariablesResponse                                                                                                               |                                                                                                                                                                     | 充电站正确响应 SetVariablesResponse 消息，确认变量设置成功。                                                            |
| 5    |                                                                                                                                       | 发送 GetVariablesRequest，包含: <br> - variable.name = "Offline Threshold" <br> - component.name = "OCPPCommCtrlr" <br> - attributeType 省略                               | CSMS (OCTT) 正确发送 GetVariablesRequest 消息，目标是获取 "OCPPCommCtrlr" 组件下名为 "Offline Threshold" 的变量值。        |
| 6    | 响应 GetVariablesResponse                                                                                                               |                                                                                                                                                                     | 充电站正确响应 GetVariablesResponse 消息，返回 "Offline Threshold" 变量的当前值。                                       |
| 7    |                                                                                                                                       | 发送 GetBaseReportRequest，包含: <br> - requestld = <Generated requestld> <br> - reportBase = FullInventory                                                              | CSMS (OCTT) 正确发送 GetBaseReportRequest 消息，请求完整配置报告。                                                   |
| 8    | 响应 GetBaseReportResponse                                                                                                              |                                                                                                                                                                     | 充电站正确响应 GetBaseReportResponse 消息，确认报告请求已接收。                                                          |
| 9    | 发送 NotifyReportRequest <br> 备注: 此步骤重复多次，以报告所有配置变量。                                                                                    |                                                                                                                                                                     | 充电站正确发送 NotifyReportRequest 消息，包含部分配置变量报告。此步骤重复多次，直到所有配置变量报告完毕。                                      |
| 10   |                                                                                                                                       | 响应 NotifyReportResponse                                                                                                                                             | CSMS (OCTT) 正确响应 NotifyReportResponse 消息，确认接收到配置变量报告。                                                |
| 11   |                                                                                                                                       | 发送 RequestStartTransactionRequest <br> 备注: -                                                                                                                        | CSMS (OCTT) 正确发送 RequestStartTransactionRequest 消息，请求开始一个事务。                                         |
| 12   | 响应 RequestStartTransactionResponse                                                                                                    |                                                                                                                                                                     | 充电站正确响应 RequestStartTransactionResponse 消息，Rejected。                                                 |
| 13   |                                                                                                                                       | 发送 TriggerMessageRequest，包含: <br> - requestedMessage = BootNotification                                                                                             | CSMS (OCTT) 正确发送 TriggerMessageRequest 消息，请求充电站发送 BootNotification 消息。                               |
| 14   | 响应 TriggerMessageResponse                                                                                                             |                                                                                                                                                                     | 充电站正确响应 TriggerMessageResponse 消息，确认触发消息请求已接收。                                                       |
| 15   | 发送 BootNotificationRequest <br> 备注: 充电站在响应 TriggerMessageRequest 后，在 BootNotificationResponse 的间隔时间到达之前，重新发送 BootNotificationRequest。 |                                                                                                                                                                     | 充电站正确发送 BootNotificationRequest 消息，且如备注所述，在指定时间前重新发送。                                                |
| 16   |                                                                                                                                       | 响应 BootNotificationResponse，状态为 Accepted，心跳间隔为 <Configured heartbeatinterval>                                                                                       | CSMS (OCTT) 正确响应 BootNotificationResponse 消息，消息状态为 Accepted，并且包含配置的心跳间隔。表明引导启动流程被接受。                 |
| 17   | 通知 CSMS 所有连接器的当前状态                                                                                                                    |                                                                                                                                                                     | 充电站为所有连接器发送状态通知消息 (例如 StatusNotificationRequest)。                                                    |
| 18   |                                                                                                                                       | 相应响应                                                                                                                                                                | CSMS (OCTT) 对接收到的连接器状态通知消息进行相应响应 (例如 StatusNotificationResponse)。                                    |

#### TC_B_03_CS

验证充电桩是否能够正确处理被拒绝的启动通知。

|                                                                                                                                        |                                                                                                                                                              |   |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | - |
| 1. 充电桩发送启动通知请求                                                                                                                         | 2. OCPP 合规测试工具（OCTT）以状态为 “被拒绝” 且间隔为 < 已配置的心跳间隔 > 的启动通知响应进行回复                                                                                                 |   |
| 3. 充电桩发送启动通知请求  <br>注意事项：  <br>- 充电桩在 x 秒后重新发送启动通知请求，其中 x 等于或大于启动通知响应中的间隔时间。  <br>- 在此期间，不允许充电桩发送任何启动通知请求。  <br>- 在需要重新发送之前，充电桩可以关闭连接。 | 4. OCTT 以状态为 “已接受” 且间隔为 < 已配置的心跳间隔 > 的启动通知响应进行回复                                                                                                             |   |
| 5. 充电桩向充电站管理系统（CSMS）通知所有连接器的当前状态。                                                                                                      | 6. OCTT 做出相应回复。                                                                                                                                              |   |
| 工具验证                                                                                                                                   | * 步骤 5：消息：状态通知请求  <br>- 连接器状态：可用  <br>消息：通知事件请求  <br>- 事件数据 [0]. 触发条件：增量  <br>- 事件数据 [0]. 实际值：“可用”  <br>- 事件数据 [0]. 组件名称：“连接器”  <br>- 事件数据 [0]. 变量名称：“可用性状态” |   |

TC_B_30_CS

验证充电桩是否能够通过回复 “安全错误” 来处理来自充电站管理系统（CSMS）的未经授权的消息。

一般我们的充电桩收到拒绝的消息，还会保持连接吗？

TC_B_06_CS

获取单个变量值

![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250217145813.png)

TC_B_07_CS

获取两个所需变量的值

#### TC_B_32_CS

验证充电桩是否能够处理针对未知组件的 GetVariablesRequest 请求。充电桩遇到不支持的参数要返回结果，申明未知组件
![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250217165524.png)

#### TC_B_33_CS

 验证充电桩是否能够处理针对未知变量的 GetVariablesRequest 请求

![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250217165919.png)

TC_B_34_CS

验证充电桩是否能够处理接收到的针对不支持的属性类型的 GetVariablesRequest 请求

![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250217171210.png)

TC_B_09_CS

测试使用 SetVariablesRequest 为设备管理（DM）实现中必须存在的一个强制组件 / 变量组合设置单个值的功能（设置单个参数值）

![7ea3530b9e3bd1bcd95a6c21ce68e08.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/7ea3530b9e3bd1bcd95a6c21ce68e08.png)

TC_B_10_CS

测试使用 SetVariablesRequest 为设备管理（DM）实现中必须存在的一个强制组件 / 变量组合设置多个值的情况（设置多个参数值）

![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250217172317.png)
TC_B_35_CS
设置未知组件
验证充电桩是否能够处理接收到的针对未知组件的 SetVariablesRequest 请求。

![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250217173131.png)
TC_B_36_CS

设置未知参数
验证充电桩是否能够处理接收到的针对未知变量的 SetVariablesRequest 请求。

![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250217173634.png)

TC_B_37_CS

验证充电桩是否能够处理接收到的针对不支持的属性类型的 SetVariablesRequest 请求。

![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250217174019.png)

TC_B_11_CS

参数设置，普遍性？

![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250217175925.png)
![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250218091905.png)
TC_B_39_CS

只读参数设置

验证充电桩是否能够处理接收到的针对只读变量的 SetVariablesRequest 请求

![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250218092428.png)

TC_B_12_CS

测试充电桩是否支持配置清单基础报告

![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250218092834.png)
TC_B_13_CS
 测试充电桩是否支持完整清单基础报告
![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250218093336.png)

TC_B_14_CS

测试充电桩是否支持摘要清单基础报告

![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250218093712.png)
TC_B_15_CS

 不支持的基础报告\
测试当请求获取摘要清单基础报告，但充电桩不支持该报告时，充电桩是否返回 “NotSupported（不支持）”。即充电桩的实现不支持可选的摘要清单报告

TC_B_16_CS
测试充电桩是否支持自定义报告查询功能

![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250218095235.png)

#### TC_B_17_CS

旨在测试充电桩是否支持自定义报告查询功能

![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250218095840.png)
TC_B_18_CS

获取自定义报告 - 基于组件条件和组件 / 变量

先请求一个应返回值的筛选条件，再请求一个不应返回值的筛选条件，以此测试充电桩是否支持自定义报告查询，以及是否会考虑组件条件

![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250218104744.png)
![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250218110715.png)

TC_B_19_CS

获取自定义报告 - 针对未知组件标准

测试充电桩在接收到包含无效组件标准值的请求时，是否会返回 “不支持（NotSupported）” 的返回代码。

![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250218110923.png)

TC_B_20_CS
重置充电桩 - 无正在进行的交易 - 空闲时重置

![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250218111505.png)

TC_B_21_CS

![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250218111645.png)
![image.png](https://raw.githubusercontent.com/weirenhao/friendly-image/master/20250218111707.png)
