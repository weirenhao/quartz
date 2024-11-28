---
share: "true"
---

功能开关：CustomDisplayCostAndPrice    该功能包括`DataTransfer`创建一个自定义`SetUserPrice`和一个`RunningCost`和`FinalCost`消息。以及`DefaultPrice`的关键key


# DefaultPrice:

	设置默认的显示文本和价格，通过ChangeConfiguration的形式配置

	ChangeConfiguration中的data字段。请求DefaultPrice

  

 priceText        | string        用于显示价格信息的文本                                       

 priceTextOffline | string       充电点离线时显示的备选文本。                                 

 chargingPrice    | ChargingPrice    在离线时开始会话时使用的价格组件结构。 如果不允许离线会话或不收费则不需要 


示例


	DefaultPrice的示例消息，其中包含脱机时使用的定价信息:

  

```json

ChangeConfiguration.req( "DefaultPrice", "{

"priceText": "0.15 $/kWh, idle fee after charging: 1 $/hr",

"priceTextOffline": "The station is offline. Charging is possible for 0.15

$/kWh.",

"chargingPrice": { "kWhPrice": 0.15, "hourPrice": 0.00, "flatFee": 0.00 }

}" )

```

  

	脱机时没有计算成本时的DefaultPrice示例消息:

  

```json

ChangeConfiguration.req( "DefaultPrice", "{

"priceText": "0.15 $/kWh, idle fee after charging: 1 $/hr",

"priceTextOffline": "The station is offline. The charging is free-ofcharge.",

}" )
```

  
# SetUserPrice

	设置特定用户价格，仅用于显示，与授权关联。
	它没有 "chargePrice "和 "idlePrice "字段，因为中央系统将在`StartTransaction`消息后立即发送`RunningCost`消息


```json

ChangeConfiguration.req( "DefaultPrice", "{

"priceText": "0.15 $/kWh, idle fee after charging: 1 $/hr",

"priceTextOffline": "The station is offline. The charging is free-ofcharge.",

}" )

```

| idToken   | string  应用此价格的用户的idToken      |

| priceText | string 用于显示价格和价格组件的文本。 |



# FinalCost

 它与交易相关联并在==交易结束时发送==。 成本字段包含总成本，充电点可能会使用它发送到集成支付终端（如果它配备了一个）



```json

DataTransfer.req( "org.openchargealliance.costmsg", "FinalCost", "{

"transactionId": 98765,

"cost": 3.31,

"priceText": "$2.81 @ $0.12/kWh, $0.50 @ $1/h, TOTAL KWH: 23.4

TIME: 03.50 COST: $3.31.

Visit www.cpo.com/invoices/13546 for an invoice of your session.",

"qrCodeText": "https://www.cpo.com/invoices/13546"

}" )

```

| transactionId | integer 应用此操作的事务。           |

| cost          | decimal 计算总最终成本。             |

| priceText     | string 用于显示价格和价格组件的文本 |

| qrCodeText    | string 可选URL显示为二维码。        |



# RunningCost


RunningCost信息用于显示交易期间的价格和成本。

  

中央系统在发送`StartTransaction.conf`响应后，立即发送一个名为 "`RunningCost` "的`DataTransfer`消息。该消息还包括充电点==在本地计算==运行成本所需的单位价格，这样就可以向客户实时显示交易成本。

  

中央系统从收费点收到的每一个表计值都会**更新交易的运行成本**，并发送一个`RunningCost`信息，该信息包含了交易的成本，直到它刚刚收到的表计值。

  

该信息有电动车==充电时使用的单位价格==，也有==闲置费的单位价格==。由中央系统决定是否和何时应收取空闲费。这由 "状态 "字段表示，它可以是 "充电 "或 "闲置"。==充电的价格在chargePrice字段中发送；闲置的价格在idlePrice字段中发送。==

  

如果**价格在一天中的某个时间发生变化**，那么可以在可选的`nextPeriod`字段中加入这些内容。然而，可能还有其他情况下，价格可能会发生变化。为此，可以添加一个字段`triggerMeterValue`，该字段描述了除了常规采样的电表值之外，充电点何时应该发送一个电表值。收到电表值后，中央系统将发送一个新的RunningCost消息，其中包含更新的价格信息。触发表计值可以被设置为一天中的某个时间、某个能量值或某个功率值。

  

RunningCost消息的JSON结构的完整描述如下所示：

  

RunningCost的`DataTransfer.req`中的数据字段

  

| 域                | 类型          | card | 描述                                         |

| ----------------- | ------------- | ---- | -------------------------------------------- |

| transactionId     | integer       | 1..1 | 应用此操作的事务                             |

| timestamp         | dateTime      | 1..1 | 此成本所依据的仪表值的时间戳                 |

| meterValue        | integer       | 1..1 | 本成本所依据的仪表值(Wh)                     |

| cost              | decimal       | 1..1 | 计算总运行成本                               |

| state             | string        | 1..1 | “正在充电”或“空闲”。确定要使用哪些定价组件。 |

| chargingPrice     | ChargingPrice | 1..1 | 充电时的价格组成                             |

| idlePrice         | IdlePrice     | 0..1 | 不充电时的价格成分。如果没有闲置费，可以选择 |

| nextPeriod        | NextPeriod    | 0..1 | 下一阶段的定价。                             |

| triggerMeterValue | Triggers      | 0..1 | 触发以请求一个新的表值。                     |

  

收费价格

  

| 域        | 类型    | card | 描述                         |

| --------- | ------- | ---- | ---------------------------- |

| kWhPrice  | decimal | 0..1 | 每千瓦时的价格。             |

| hourPrice | decimal | 0..1 | 每小时充电的价格。           |

| flatFee   | decimal | 0..1 | 收费会话（部分）的固定费用。 |

  

闲置价格

  

| 域           | 类型    | card | 描述                                                         |

| ------------ | ------- | ---- | ------------------------------------------------------------ |

| graceMinutes | integer | 0..1 | 空闲时间前的宽限期以分钟计。从状态从“充电”变为“空闲”的消息的时间戳开始计算宽限分钟。 |

| hourPrice    | decimal | 0..1 | 空闲时每小时价格。                                           |

  

下一周期

  

| 域            | 类型          | card | 描述                                           |

| ------------- | ------------- | ---- | ---------------------------------------------- |

| atTime        | dateTime      | 1..1 | 这些价格变得活跃的时间                         |

| chargingPrice | ChargingPrice | 1..1 | 充电时的价格组成                               |

| idlePrice     | IdlePrice     | 0..1 | 闲置时的价格成分。如果不收取闲置费，则可选择。 |

  

触发器

  

| 域          | 类型     | card | 描述                                                         |

| ----------- | -------- | ---- | ------------------------------------------------------------ |

| atTime      | dateTime | 0..1 | 必须发送电表值的时间                                         |

| atEnergykWh | decimal  | 0..1 | 消耗的能量，以千瓦时为单位，在此基础上必须发送电表值。       |

| atPowerkW   | decimal  | 0..1 | 下行或上行时必须发送仪表值时的功率阈值（以 kW 为单位）。 可用于在车辆==停止充电==时或在车辆以需要==不同费率的高功率==充电时触发仪表值。<br/>建议围绕该值实施滞后，以避免当功率围绕该水平波动时重复触发。 |

| atCPStatus  | string   | 0..6 | 必须根据其发送计量值的 ChargePointStatus。<br/>匹配 ChargePointStatus 枚举的值：可用、准备、充电、暂停EVSE、暂停EV、整理 |

  

运行成本（完整的例子）

  

```json

DataTransfer.req("vendorId": "org.openchargealliance.costmsg",

"messageId": "RunningCost",

"data": "{

"transactionId": 12345,

"timestamp": "2021-03-19T12:00:00Z", "meterValue": 1234000,

"cost": 1.00,

"state": "Charging",

"chargingPrice": {

"kWhPrice": 0.123, "hourPrice": 0.00, "flatFee": 0.00 },

"idlePrice": { "graceMinutes": 30, "hourPrice": 1.00 },

"nextPeriod: {

"atTime": "2021-03-19T19:00:00Z",

"chargingPrice": {

"kWhPrice": 0.100, "hourPrice": 0.00, flatFee": 0.00 },

"idlePrice": { "hourPrice": 0.00 }

}

"triggerMeterValue": {

"atTime": "2021-03-19T23:00:00Z",

"atEnergykWh": 50.0,

"atPowerkW": 0.1,

"atCPStatus": [ "SuspendedEV", "SuspendedEVSE" ]

}

}

```

  

运行成本(最小示例，只有千瓦时价格)

  

```json

DataTransfer.req("vendorId": "org.openchargealliance.costmsg",

"messageId": "RunningCost",

"data": "{

"transactionId": 12345,

"timestamp": "2021-03-19T12:00:00Z", "meterValue": 1234000,

"cost": 1.00,

"state": "Charging"

"chargingPrice": { "kWhPrice": 0.123 },

}

```

  

运行成本(现实例子，千瓦时价格，闲置费用，未来价格变化)

  

```json

DataTransfer.req("vendorId": "org.openchargealliance.costmsg",

"messageId": "RunningCost",

"data": "{

"transactionId": 12345,

"timestamp": "2021-03-19T14:00:00Z", "meterValue": 1234567,

"cost": 1.00,

"state": "Idle",

"chargingPrice": { "kWhPrice": 0.123 },

"idlePrice": { "graceMinutes": 30, "hourPrice": 1.00 },

"nextPeriod: {

"atTime": "2021-03-19T19:00:00Z",

"chargingPrice": { "kWhPrice": 0.100 },

"idlePrice": { "graceMinutes": 30, "hourPrice": 1.00 }

}

}

```

  

### 显示时区

  

OCPP 1.6没有对时区的内置支持。在显示与定价信息相关的时间时，可能需要设置一个时区。充电点的时区可以通过以下配置变量设置:

  

时区校正

  

```json

ChangeConfiguration.req( "TimeOffset", "-05:00" )

```

  

下一次偏移转换日期时间:

  

什么时候改为夏季或冬季时间

  

```json

ChangeConfiguration.req( "NextTimeOffsetTransitionDateTime",

"2021-03-28T02:00:00+01:00"

```

  

时间偏移下一个转换:

  

```json

ChangeConfiguration.req( "TimeOffsetNextTransition", "-04:00" )

```

  

这类似于OCPP 2.0.1中将时间偏移设置为设备模型变量的方式。

  

### 闲置费用

  

闲置费用的计算不是DMS的要求.

  

如果定价模型需要计算空闲费，即对充电完成后的连接收取费用，那么有两种不同的情况可能发生。

  

有交易中的空闲时间 和 交易结束后的空闲时间，而车辆仍然连接到充电点。

  

第一种情况很容易被检测到，因为收到的仪表值没有变化

  

#### 交易期间的空闲时间

  

DMS或CTEP并没有规定如果收取空闲费，应该如何衡量空闲时间。

  

由==中央系统==而不是收费点来决定一项交易何时被认为是处于闲置时间。

这样做的原因是，由于需求响应事件或智能充电算法，在中央系统的要求下，充电可能已经暂停。在这种情况下，向客户收取闲置费是不公平的。

  

当中央系统看到电表值保持不变时，它可以检测到电动车不再充电。根据表计值的间隔，可能需要很多分钟才会被注意到，除非充电点发送状态通知`SuspendedEV`或`SuspendedEVSE`。

  

由CSO决定是否将暂停的EV和暂停的EVSE都算作空闲时间，或者只将暂停的EV视为空闲时间

  

##### 通过低功率使用检测闲置

  

中央系统可以通过设置atPowerkW触发器（例如0.1kW的值），要求充电点==在车辆充电低于一定功率时发送一个仪表值==。如果充电点被配置为不仅发送测量值 "Energy.Active.Import.Register"，而且还发送 "Power.Active.Import"，那么中央系统将立即从功率读数中知道电动汽车已经停止充电。如果只提供寄存器读数，那么中央系统将不得不等待，直到下一个电表值才知道电动车已经停止充电。不过，这仍然比通过常规的电表间隔要快。

  

每当atPowerkW阈值向上或向下越过时，就会触发一个电表值的发送。中央系统需要一些逻辑来确定越过阈值的方向。

  

如果充电暂停是由本地负载平衡引起的，而不是由中央系统发起的，那么中央系统将不知道，仅根据电力消耗，暂停是由EV或EVSE引起的，除非它也监测SuspendedEV或SuspendedEVSE的 StatusNotifications。在这种情况下，使用atCPStatus触发器很方便。

  

##### 通过充电点状态变化检测空闲

  

当一个充电点进入`SuspendedEV`或`SuspendedEVSE`状态时，中央系统在收到`StatusNotification.req`时知道充电已经暂停了。如果中央系统需要知道暂停开始时的电表值，那么RunningCost消息应该包含atCPStatus触发器，其值为SuspendedEV和SuspendedEVSE，以便触发充电点在那一刻发送电表值。

  

##### 在空闲和充电之间切换

  

当中央系统检测到充电已经暂停，它将发送一个新的RunningCost消息，状态设置为 "闲置"。从那一刻起，充电点将根据idlePrice中的参数对闲置时间进行充电。

  

当电动车恢复充电时，充电点可能会发送状态通知“正在充电”，或者一段时间后会发送一个仪表值。(可以通过设置atPowerkW或atCPStatus触发器来强制发送电表值）。然后中央系统将发送一个新的RunningCost信息，状态设置为 "充电"，充电桩将使用充电价格信息来计算成本并显示在显示屏上。

  

#### 交易结束后的闲置时间

  

检测交易结束后发生的闲置时间和电动车保持连接是比较困难的。在OCPP 1.6中，一个诱人的解决方案是==等待StatusNotification "Available "==来表示车辆已经被拔掉。然而，这并不可靠。如果充电点在交易停止时处于离线状态，StatusNotifications可能永远不会到达中央系统，因为它们不需要被充电点排队。

  

#### 可靠的连接器拔插信息

  

使用StatusNotification来检测拔插并不总是可靠的，因为当充电点离线时，该消息不能保证被排队。解决这个问题的方法是定义一个`DataTransfer`消息 "ConnectorUnplugged"，充电点发送该消息以示连接器已经被拔掉，可以停止空闲费计算。

  

这样的DataTransfer信息看起来像这样。

  

```json

DataTransfer.req( "org.openchargealliance.costmsg", "ConnectorUnplugged",

"{"transactionId": 123456, "timestamp": "2020-06-01T12:34:00Z"}" )

```

  

此DataTransfer "ConnectorUnplugged"消息不替换现有的

  

StatusNotification。请求消息。DataTransfer“ConnectorUnplugged”作为一个附加的可靠消息发送，只要充电点离线，它就会像其他与事务相关的消息一样排队。

  

==当连接器可用时，充电点仍然需要发送StatusNotification.req==，因为中央系统可能依赖它来报告准确的连接器状态。这也确保了在中央系统不支持新的DataTransfer消息时的最大兼容性。

  

中央系统通常在收到StopTransaction.req消息后结束一个交易。如果已经实现了在交易停止后（直到连接器被拔掉）计算闲置费的定制，那么这必须在一个布尔配置键 "CustomIdleFeeAfterStop "中报告，向中央系统报告 "true"，这样它就知道它必须延长交易，直到收到DataTransfer "ConnectorUnplugged"。

  

```json

ChangeConfiguration.req( "CustomIdleFeeAfterStop", "true" )

```

  

当中央系统不支持事务停止后扩展时，它可以使用相同的配置键关闭此行为。

  

### 直接付款

  

通常情况下，是由eMSP向客户开具发票。

  

但在用信用卡或借记卡或其他方式直接付款的情况下，则由CPO充当eMSP。在这种情况下，必须有一种方法可以根据客户的要求向其提供可打印的收据

  

由于充电点通常不配备打印机，解决方案是显示一条信息，引导客户到一个可以下载收据的网站。

  

#### 显示OCPP 1.6定制的序列图

  

下图显示了在交易期间报告==价格和成本==的事件序列

  

##### 交易中的价格计算

  

中央系统发送当前和可选的下一阶段的计算成本和价格。充电点用它来计算中间的成本值。

  

```c

//可选，设置新的默认价格

/* 中央系统 -----------------------------------------------------------------> 充电点 */

ChangeConfiguration.req( "DefaultPrice", "priceText": "0.15 $/kWh, idle fee after charging: 1 $/hr",

"chargingPrice": { "kWhPrice": 0.15, "hourPrice": 0.00, "flatFee": 0.00 },

"idlePrice": { "graceMinutes": 30, "hourPrice": 1.00 } )

/* 中央系统 <----------------------------------------------------------------- 充电点 */

ChangeConfiguration.conf( Accepted )

  

//开始传输

//用户授权

/* 中央系统 <----------------------------------------------------------------- 充电点 */

Authorize.req( <idToken> )

/* 中央系统 -----------------------------------------------------------------> 充电点 */

Authorize.conf( Accepted )

  

//中央系统发送用户特定价格

/* 中央系统 -----------------------------------------------------------------> 充电点 */

DataTransfer.req( "SetUserPrice", <idToken>, "$0.123 per kWh, 1$/hour idle fee" )

/* 中央系统 <----------------------------------------------------------------- 充电点 */

DataTransfer.conf( Accepted )

  

//用户插入

/* 中央系统 <----------------------------------------------------------------- 充电点 */

StartTransaction.req( 1, <idToken>, meterValue=1234000 )

/* 中央系统 -----------------------------------------------------------------> 充电点 */

StartTransaction.conf( Accepted, <txId> )

  

//中央系统发送成本和单价，并在19:00和空闲阈值触发价格变化

/* 中央系统 -----------------------------------------------------------------> 充电点 */

DataTransfer.req( "RunningCost", "{ "transactionId": <txId>, "time": "2021-03-19T12:00:00Z", "meterValue": 1234000,

"cost": 0.00,

"state": "Charging",

"chargingPrice": {"kWhPrice": 0.123 },

"idlePrice": { "graceMinutes": 30, "hourPrice": 1.00 },

"nextPeriod": { "atTime": "2021-03-19T19:00:00Z", ... },

"triggerMeterValue": { "atPowerkW": 0.1 } } )

/* 中央系统 <----------------------------------------------------------------- 充电点 */

DataTransfer.conf( Accepted )

//根据本地测量的使用情况计算和循环显示成本

  

//接受计量值

while（1）{

    //CP发送新的计量值

    /* 中央系统 <------------------------------------------------------------- 充电点 */

    MeterValue.req( 1235000 ) CP sends

    /* 中央系统 -------------------------------------------------------------> 充电点 */

    MeterValue.conf()

  

    //中央系统发送更新的成本和单价

    /* 中央系统 -------------------------------------------------------------> 充电点 */

    DataTransfer.req( "RunningCost", "{ "transactionId": <txId>, "time": "2021-03-19T12:10:00Z",            "meterValue": 1235000,

    "cost": 1.23,

    "state": "Charging",

    "chargingPrice": {"kWhPrice": 0.123 },

    "idlePrice": { "graceMinutes": 30, "hourPrice": 1.00 },

    "nextPeriod": { "atTime": "2021-03-19T19:00:00Z", ... },

    "triggerMeterValue": { "atPowerkW": 0.1 } } )

    /* 中央系统 <------------------------------------------------------------- 充电点 */

    DataTransfer.conf( Accepted )

}

  

//用中心成本校准本地计算的成本

  

//根据本地测量的使用情况计算和循环显示成本

```

  
  
  

##### 电动车停止和恢复时的价格计算

  

当中央系统发现电动汽车停止充电时，它将发送一个带有宽限期、闲置成本和充电成本的 "闲置 "状态的运行成本。充电费用包括在其中，以便充电点在电动车恢复充电时可以再次开始计数。

  

```json

//电动汽车停止充电

//当充电下降到atPowerkW功率以下时，电动汽车发送测量值

/* 中央系统 <----------------------------------------------------------------- 充电点 */

MeterValue.req( 1236789 )

/* 中央系统 -----------------------------------------------------------------> 充电点 */

MeterValue.conf()

  

//EV发送常规采样的仪表值

/* 中央系统 <----------------------------------------------------------------- 充电点 */

MeterValue.req( 1236789 )

/* 中央系统 -----------------------------------------------------------------> 充电点 */

MeterValue.conf()

  

//中央系统检测空闲情况->开始宽限期和空闲期（桩端不进行）

  

//中央系统发送更新的成本和单价

/* 中央系统 -----------------------------------------------------------------> 充电点 */

DataTransfer.req( "RunningCost", "{ "transactionId": <txId>, "time": "2021-03-19T14:00:00Z", "meterValue": 1236789,

"cost": 2.00,

"state": "Idle","chargingPrice": {"kWhPrice": 0.123 }, "idlePrice": { "graceMinutes": 30, "hourPrice": 1.00 },

"triggerMeterValue": { "atPowerkW": 0.1 } } )

/* 中央系统 <----------------------------------------------------------------- 充电点 */

DataTransfer.conf( Accepted )

  

//用中心成本校准本地计算的成本

//【宽限期30分钟】闲置不收费

//(空闲阶段)计算并显示空闲时间的成本

  

//电动汽车恢复充电

//充电时电动汽车发送电表数值超过atPowerkW功率

/* 中央系统 <----------------------------------------------------------------- 充电点 */

MeterValue.req( 1236790 )

/* 中央系统 -----------------------------------------------------------------> 充电点 */

MeterValue.conf()

  

//EV发送常规采样的仪表值

/* 中央系统 <----------------------------------------------------------------- 充电点 */

MeterValue.req( 1236800 )

/* 中央系统 -----------------------------------------------------------------> 充电点 */

MeterValue.conf()

  

//中央系统检测到电动汽车正在充电->停止收取闲置费（桩端不进行）

  

//中央系统发送更新的成本和下一期价格

/* 中央系统 -----------------------------------------------------------------> 充电点 */

DataTransfer.req( "RunningCost", "{ "transactionId": <txId>, "time": "2021-03-19T15:00:00Z", "meterValue": 1236800,

"cost": 2.50,

"state": "Charging", "chargingPrice": {"kWhPrice": 0.123 }, "idlePrice": { "graceMinutes": 30, "hourPrice": 1.00 },

"triggerMeterValue": { "atPowerkW": 0.1 } } )

/* 中央系统 <---------------------------------------------------------------- 充电点 */    

DataTransfer.conf( Accepted )

  

//用中心成本校准本地计算的成本

  

//根据本地测量的使用情况计算和循环显示成本

  

```

  
  
  

##### 交易终止时的价格计算

  

```json

//用户停止充电

/* 中央系统 <---------------------------------------------------------------- 充电点 */

StopTransaction.req( txId, meterValue=1260100 )

/* 中央系统 ----------------------------------------------------------------> 充电点 */

StopTransaction.conf()

  

//计算停机后的闲置费用，直到插拔(可选)

//中央系统发送更新的闲置成本和单价。其他字段不再适用，可以省略。

/* 中央系统 ----------------------------------------------------------------> 充电点 */

DataTransfer.req( "RunningCost", "{ "transactionId": <txId>, "time": "2021-03-19T15:30:00Z", "meterValue": 1260100,

"cost": 3.50,

"state": "Idle",

"idlePrice": { "graceMinutes": 30, "hourPrice": 1.00 } } )

/* 中央系统 <---------------------------------------------------------------- 充电点 */

DataTransfer.conf( Accepted )

  

//用中心成本校准本地计算的成本

  

//开始收费宽限/空闲时间（桩端不计算）

  

//根据本地测量的使用情况计算和循环显示成本

  

//用户拔出插头，CP可靠信号连接器已拔出

/* 中央系统 <---------------------------------------------------------------- 充电点 */

StatusNotification.req( 1, Available )

/* 中央系统 ----------------------------------------------------------------> 充电点 */

StatusNotification.conf()

/* 中央系统 <---------------------------------------------------------------- 充电点 */

DataTransfer.req( "ConnectorUnplugged", <txId>, <timestamp> )

/* 中央系统 ----------------------------------------------------------------> 充电点 */

DataTranfer.conf( Accepted )

  

//展示最终成本

//中央系统发送最终成本

/* 中央系统 -----------------------------------------------------------------> 充电点 */

DataTransfer.req( "FinalCost", <txId>, 3.70, "$3.20 @ $0.123/kWh, $0.50 @ $1/h, TOTAL KWH: 26.1 TIME: 03:30H COST: $3.70" ) }

/* 中央系统 <----------------------------------------------------------------- 充电点 */

DataTransfer.conf( Accepted )

  

//显示总成本和数量

  
  

```

  
  
  

### 用于(部分)脱机情况的序列图

  

不同的运营商可能对离线情况实施不同的行为。这也可能受到当地立法的制约。

  

最终费用由中央系统计算。如果没有连接，充电点只能显示它在本地计算的费用。这应该与中央系统的费用相同，但这并不保证。

  

可能存在以下可能：

  

1. 不收费

  

   当最终费用无法显示时，就不会对交易收取任何费用。

  

2. 部分收费

  

   当不能显示最终费用时，只收取到交易期间收到的最后一个计价器数值。

  

3. 定期收费

  

   当最终成本无法显示时，向客户显示一条信息，即显示器上显示的成本可能与发票上的最终成本略有出入，因为系统目前与后台没有连接。或者，由于缺乏连接，根本就不显示任何费用。

  

#### 暂时脱机时的价格计算

  

充电点可以继续计算当前和下一期的费用，并且可以显示最终费用，因为它==在交易结束前就已经重新上线==。

  

```json

//接收仪表值,交易正在进行中

while (1) {

    //CP发送新的测量值

    /* 中央系统 <------------------------------------------------------------ 充电点 */

    MeterValue.req( 1234000 )

    /* 中央系统 ------------------------------------------------------------> 充电点 */

    MeterValue.conf()

  

    //中央系统发送更新的成本和单价

    /* 中央系统 ------------------------------------------------------------> 充电点 */

    DataTransfer.req( "RunningCost", "{ "transactionId": <txId>, "time": "2021-03-19T12:00:00Z",        "meterValue": 1234000,

    "cost": 3.12, "state": "Charging", "chargingPrice": {"kWhPrice": 0.123 } } )

    /* 中央系统 <------------------------------------------------------------ 充电点 */

    DataTransfer.conf( Accepted )

  

    //CP重新校准成本

    //用中心成本校准本地计算的成本

    //根据本地测量的“使用率”计算和显示成本

}

  

//失去与中央系统的连接

/* 中央系统 X<--------------------------------------------------------------- 充电点 */

MeterValue.req( 1234000 )

//根据当前和下一时期的已知价格计算和显示成本

  

//恢复与中央系统的连接

//cp发送新的测量值

/* 中央系统 <---------------------------------------------------------------- 充电点 */

MeterValue.req( 1234000 )

/* 中央系统 ----------------------------------------------------------------> 充电点 */

MeterValue.conf()

  

//中央系统发送更新的成本和下一期价格

/* 中央系统 -----------------------------------------------------------------> 充电点 */

DataTransfer.req( "RunningCost", "{ "transactionId": <txId>, "time": "2021-03-19T14:00:00Z", "meterValue": 1244000,

"cost": 1.23, "state": "Charging", "chargingPrice": {"kWhPrice": 0.123 } } )

/* 中央系统 <----------------------------------------------------------------- 充电点 */

DataTransfer.conf( Accepted )

CP

  

//CP重新校准成本

//用中心成本校准本地计算的成本

//根据本地测量的使用情况计算和显示成本

```

  
  
  

#### 离线停止交易的价格计算

  

充电点已计算出价格，但最终费用无法显示，直到充电点再次上线。

  

```json

//交易正在进行

//CP发送新的测量值

/* 中央系统 <--------------------------------------------------------------- 充电点 */

MeterValue.req( 1234000 )

/* 中央系统 ---------------------------------------------------------------> 充电点 */

MeterValue.conf()

  

//中央系统发送更新的成本和下一期价格

/* 中央系统 ---------------------------------------------------------------> 充电点 */

DataTransfer.req( "RunningCost", "{ "transactionId": <txId>, "time": "2021-03-19T12:00:00Z", "meterValue": 1234000,

"cost": 3.12, "state": "Charging", "chargingPrice": {"kWhPrice": 0.123 } } )

/* 中央系统 <--------------------------------------------------------------- 充电点 */

DataTransfer.conf( Accepted )

  

//CP重新校准成本

//用中心成本校准本地计算的成本

//根据本地测量的“使用率”计算和显示成本

  

//失去与中央系统的连接

/* 中央系统 x--------------------------------------------------------------- 充电点 */

MeterValue.req( 1234000 )

  

//用户停止交易

/* 中央系统 x--------------------------------------------------------------- 充电点 */

StopTransaction.req( txId, meterValue=1244000 )

  

//稍后，当与中央系统的连接恢复时

//CP发送停止通知

/* 中央系统 <--------------------------------------------------------------- 充电点 */

StopTransaction.req( txId, meterValue=1244000 )

/* 中央系统 ---------------------------------------------------------------> 充电点 */

StopTransaction.conf()

  

//中央系统发送最终成本

/* 中央系统 ---------------------------------------------------------------> 充电点 */

DataTransfer.req( "FinalCost", <txId>, 1.23, "$1.23 @ $0.123/kWh, $0.00 @ $1/h, TOTAL KWH: 10.0 TIME: 01:30H COST: $1.23" ) }

/* 中央系统 <--------------------------------------------------------------- 充电点 */

DataTransfer.conf( Accepted )

  

//如果这是最近的事务而没有其他正在进行的事务，则CP只显示信息

```

  
  
  

#### 离线开始交易的价格计算

  

不知道用户的具体价格。充电点不能显示运行成本，除非它已被配置为默认定价的单位价格。用户同意使用默认价格。如果充电桩重新上线，中央系统继续使用默认价格方案。

  

另外，可以不允许充电或在离线时免费充电。

  

```json

//线下交易开始，线上结束时的价格计算

//默认价格是之前安装的

/* 中央系统 ---------------------------------------------------------------> 充电点 */

ChangeConfiguration.req( "DefaultPrice", "priceText": "0.15 $/kWh, idle fee after charging: 1 $/hr",

"chargingPrice": { "kWhPrice": 0.15, "hourPrice": 0.00, "flatFee": 0.00 },

"idlePrice": { "graceMinutes": 30, "hourPrice": 1.00 } )

/* 中央系统 <--------------------------------------------------------------- 充电点 */

ChangeConfiguration.conf( Accepted )

  

//CP下线

//事务在脱机时启动

//用户试图授权

/* 中央系统 x--------------------------------------------------------------- 充电点 */

Authorize.req( <idToken> )

//CP离线授权

//“不知道用户的价格信息。使用默认定价。同意吗?Y / N”

//用户插入

/* 中央系统 x--------------------------------------------------------------- 充电点 */

StartTransaction.req( 1, <idToken> )

//CP缓存启动通知

//根据本地测量的使用情况计算和显示成本。离线时不能收取闲置费用。

  

//恢复与中央系统的连接

/* 中央系统 <--------------------------------------------------------------- 充电点 */

StartTransaction.req( 1, <idToken>, meterValue=1234000 )

//中央系统注意到事务是离线启动的

//中央系统为默认定价方案发送成本和单价

/* 中央系统 ---------------------------------------------------------------> 充电点 */

StartTransaction.conf( Accepted, <txId> )

/* 中央系统 ---------------------------------------------------------------> 充电点 */

DataTransfer.req( "RunningCost", "{ "transactionId": <txId>, "time": "2021-03-19T12:00:00Z", "meterValue": 1234000,

"cost": 0.00,

"state": "Charging",

"chargingPrice": {"kWhPrice": 0.150 },

"idlePrice": { "graceMinutes": 30, "hourPrice": 1.00 } } )

/* 中央系统 <--------------------------------------------------------------- 充电点 */

DataTransfer.conf( Accepted )

  

//CP发送新的仪表值

/* 中央系统 <--------------------------------------------------------------- 充电点 */

MeterValue.req( 1234100 )

/* 中央系统 ---------------------------------------------------------------> 充电点 */

MeterValue.conf()

  

//中央系统根据默认价格发送成本

/* 中央系统 ---------------------------------------------------------------> 充电点 */

DataTransfer.req( "RunningCost", "{ "transactionId": <txId>, "time": "2021-03-19T12:10:00Z", "meterValue": 1234100,

"cost": 0.15,

"state": "Charging",

"chargingPrice": {"kWhPrice": 0.150 },

"idlePrice": { "graceMinutes": 30, "hourPrice": 1.00 } } )

/* 中央系统 <--------------------------------------------------------------- 充电点 */

DataTransfer.conf( Accepted )

  

//用户停止事务

/* 中央系统 <--------------------------------------------------------------- 充电点 */

StopTransaction.req( txId, meterValue=1244000 )

/* 中央系统 ---------------------------------------------------------------> 充电点 */

StopTransaction.conf()

  

//中央系统发送最终价格

/* 中央系统 ---------------------------------------------------------------> 充电点 */

DataTransfer.req( "FinalCost", <txId>, 1.50, "$1.50 @ $0.150/kWh, $0.00 @ $1/h, TOTAL KWH: 10.0 TIME: 01:00H COST: $1.50" )

/* 中央系统 <--------------------------------------------------------------- 充电点 */

DataTransfer.conf( Accepted )

  

//显示总成本和数量

  

```

  
  
  

#### 完全线下交易的价格计算

  

不知道用户的具体价格。充电点不能显示运行成本，除非它已被配置为默认定价的单位价格。用户同意使用默认价格。当中央系统后来收到离线启动/停止交易信息时，它使用默认价格方案来计算成本。

  

可以不允许充电或在离线时免费充电。

  

```json

//价格计算时，交易完全离线

//默认价格是之前安装的

...

  

//CP下线

//事务在脱机时启动

//用户试图授权

/* 中央系统 x--------------------------------------------------------------- 充电点 */

Authorize.req( <idToken> )

//CP离线授权

//“不知道用户的价格信息。使用默认定价。同意吗?Y / N”

//用户插入

/* 中央系统 x--------------------------------------------------------------- 充电点 */

StartTransaction.req( 1, <idToken> )

//CP缓存启动通知

//根据本地测量的使用情况计算和显示成本。离线时不能收取闲置费用。

//用户停止充电

/* 中央系统 x--------------------------------------------------------------- 充电点 */

StopTransaction.req( txId )

  

//恢复与中央系统的连接

//CP发送事务消息

/* 中央系统 <--------------------------------------------------------------- 充电点 */

StartTransaction.req( 1, <idToken>, meterValue=1234000 )

//中央系统注意到事务脱机启动

/* 中央系统 ---------------------------------------------------------------> 充电点 */

StartTransaction.conf( Accepted, <txId> )

  

/* 中央系统 <--------------------------------------------------------------- 充电点 */

StopTransaction.req( txId, meterValue=1244000 )

//中央系统通知事务离线完成

//使用默认价格计算成本10千瓦时@ 0.15/千瓦时

/* 中央系统 ---------------------------------------------------------------> 充电点 */

StopTransaction.conf()

  

//没有发送FinalCost消息，因为整个事务都脱机了。电动汽车司机很可能已经不在现场了。

```



# CustomMultiLanguageMessages

CTEP是否支持   多语言支持参数