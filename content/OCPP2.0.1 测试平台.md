---
date: 2025-02-26 10:29
share: "true"
updated: 2025-02-26 10:29
---

这个文档是一个 OpenAPI 3.0.3 规范文件，用于描述名为 "CitrineOS Central System API" 的应用程序编程接口 (API)。

**总体介绍:**

- **OpenAPI 版本 (openapi): "3.0.3"**:  表明此文档遵循 OpenAPI 规范的 3.0.3 版本，这是一种广泛使用的用于描述和文档化 RESTful API 的标准。
- **信息 (info):**  提供了关于 API 的基本信息。
  - **标题 (title): "CitrineOS Central System API"**:  API 的名称，即 "CitrineOS 中央系统 API"。
  - **描述 (description): "Central System API for OCPP 2.0.1 messaging."**:  API 的用途描述，它是一个用于 OCPP 2.0.1 消息通信的中央系统 API。OCPP (Open Charge Point Protocol) 是开放充电点协议，2.0.1 是其版本，常用于电动汽车充电站与中央管理系统之间的通信。
  - **版本 (version): "1.5.0"**:  当前 API 的版本号是 1.5.0。

**组件 (components):**  定义了 API 中可重用的组件，例如安全方案和数据模型 (模式)。

- **安全方案 (securitySchemes):**  定义了 API 使用的安全认证机制。
  - **authorization (授权):**  定义了一个名为 "authorization" 的安全方案。
    - **类型 (type): "http"**:  表明这是一个 HTTP 安全方案。
    - **方案 (scheme): "bearer"**:  指定使用 Bearer 令牌 (通常是 JWT) 进行身份验证。这意味着客户端需要在 HTTP 请求头中包含一个 Bearer 令牌来获得访问 API 的权限。

- **模式 (schemas):**  定义了 API 中使用的数据结构 (数据模型)。每个模式描述了一种数据类型，包括其属性、类型、是否必需等等。以下是各个模式的详细解释：

  - **CreateSubscriptionSchema (创建订阅模式)**
    - **类型 (type): "object"**:  表明这是一个对象类型，即一个包含多个属性的结构化数据。
    - **属性 (properties):** 定义了该对象包含的属性。
      - **stationId (充电站ID):**
        - **类型 (type): "string"**: 字符串类型。
      - **onConnect (连接时):**
        - **类型 (type): "boolean"**: 布尔值类型，表示是否在充电站连接时触发事件。
      - **onClose (断开连接时):**
        - **类型 (type): "boolean"**: 布尔值类型，表示是否在充电站断开连接时触发事件。
      - **onMessage (消息时):**
        - **类型 (type): "boolean"**: 布尔值类型，表示是否在收到消息时触发事件。
      - **sentMessage (发送消息时):**
        - **类型 (type): "boolean"**: 布尔值类型，表示是否在发送消息时触发事件。
      - **messageRegexFilter (消息正则表达式过滤器):**
        - **类型 (type): "string"**: 字符串类型，允许使用正则表达式过滤消息。
      - **url (URL):**
        - **类型 (type): "string"**: 字符串类型，表示接收订阅通知的回调 URL。
    - **必需属性 (required): ["url", "stationId"]**:  "url" 和 "stationId" 属性是创建订阅时必须提供的。
    - **标题 (title): "CreateSubscriptionSchema"**: 模式的标题。

  - **ChargingStationKeyQuerySchema (充电站密钥查询模式)**
    - **类型 (type): "object"**: 对象类型。
    - **属性 (properties):**
      - **stationId (充电站ID):**
        - **类型 (type): "string"**: 字符串类型。
    - **必需属性 (required): ["stationId"]**:  "stationId" 属性是查询时必需的。
    - **标题 (title): "ChargingStationKeyQuerySchema"**: 模式的标题。

  - **ModelKeyQuerystringSchema (模型密钥查询字符串模式)**
    - **类型 (type): "object"**: 对象类型。
    - **属性 (properties):**
      - **id (ID):**
        - **类型 (type): "number"**: 数字类型。
    - **必需属性 (required): ["id"]**:  "id" 属性是查询时必需的。
    - **标题 (title): "ModelKeyQuerystringSchema"**: 模式的标题。

  - **MessageQuerystring (消息查询字符串模式)**
    - **类型 (type): "object"**: 对象类型。
    - **属性 (properties):**
      - **identifier (标识符):**
        - **类型 (type): "string"**: 字符串类型。
      - **tenantId (租户ID):**
        - **类型 (type): "string"**: 字符串类型。
      - **callbackUrl (回调URL):**
        - **类型 (type): "string"**: 字符串类型。
    - **必需属性 (required): ["identifier", "tenantId"]**:  "identifier" 和 "tenantId" 属性是查询时必需的。
    - **标题 (title): "MessageQuerystring"**: 模式的标题。

  - **CustomDataType (自定义数据类型)**
    - **描述 (description): "This class does not get 'AdditionalProperties = false' in the schema generation, so it can be extended with arbitrary JSON properties to allow adding custom data."**:  说明这个类在模式生成时不会设置 "AdditionalProperties = false"，因此可以扩展任意 JSON 属性来添加自定义数据。
    - **类型 (type): "object"**: 对象类型。
    - **属性 (properties):**
      - **vendorId (供应商ID):**
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 255**: 最大长度为 255 个字符。
    - **必需属性 (required): ["vendorId"]**:  "vendorId" 属性是必需的。
    - **标题 (title): "CustomDataType"**: 模式的标题。

  - **CertificateSigningUseEnumType (证书签名用途枚举类型)**
    - **描述 (description): "Indicates the type of the signed certificate that is returned. ... and the Charging Station connection are implemented."**:  指示返回的签名证书类型。当省略时，证书既用于 15118 连接 (如果实现) 也用于充电站到 CSMS 连接。当在 `SignCertificateRequest` 中包含 `typeOfCertificate` 并请求签名，且同时实现 15118 连接和充电站连接时，此字段是必需的。
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["ChargingStationCertificate", "V2GCertificate"]**:  允许的值包括：
      - **"ChargingStationCertificate" (充电站证书)**
      - **"V2GCertificate" (V2G 证书)** (Vehicle-to-Grid，车联网)
    - **标题 (title): "CertificateSigningUseEnumType"**: 模式的标题。

  - **CertificateSignedRequest (证书签名请求)**
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用之前定义的 `CustomDataType` 模式，表示可以使用自定义数据。
      - **certificateChain (证书链):**
        - **描述 (description): "The signed PEM encoded X.509 certificate. ... of this field."**:  签名后的 PEM 编码的 X.509 证书。也可以包含必要的子 CA 证书。证书链的顺序应从叶子证书开始。`MaxCertificateChainSize` 配置变量可以限制此字段的最大大小。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 10000**: 最大长度为 10000 个字符。
      - **certificateType (证书类型):**
        - **$ref ( \$ref ): "#/components/schemas/CertificateSigningUseEnumType"**: 引用之前定义的 `CertificateSigningUseEnumType` 模式，表示证书类型必须是枚举类型中的值。
    - **必需属性 (required): ["certificateChain"]**:  "certificateChain" 属性是必需的。
    - **标题 (title): "CertificateSignedRequest"**: 模式的标题。

  - **MessageConfirmationSchema (消息确认模式)**
    - **类型 (type): "object"**: 对象类型。
    - **属性 (properties):**
      - **success (成功):**
        - **类型 (type): "boolean"**: 布尔值类型，表示操作是否成功。
      - **payload (载荷):**
        - **类型 (type): "string"**: 字符串类型，可以包含额外的消息载荷。
    - **必需属性 (required): ["success"]**:  "success" 属性是必需的。
    - **标题 (title): "MessageConfirmationSchema"**: 模式的标题。

  - **InstallCertificateUseEnumType (安装证书用途枚举类型)**
    - **描述 (description): "Indicates the certificate type that is sent."**:  指示发送的证书类型。
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["V2GRootCertificate", "MORootCertificate", "CSMSRootCertificate", "ManufacturerRootCertificate"]**: 允许的值包括：
      - **"V2GRootCertificate" (V2G 根证书)**
      - **"MORootCertificate" (MO 根证书)** (可能是 Manufacturer Operation - 制造商操作)
      - **"CSMSRootCertificate" (CSMS 根证书)** (Central System Management System - 中央管理系统)
      - **"ManufacturerRootCertificate" (制造商根证书)**
    - **标题 (title): "InstallCertificateUseEnumType"**: 模式的标题。

  - **InstallCertificateRequest (安装证书请求)**
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **certificateType (证书类型):**
        - **$ref ( \$ref ): "#/components/schemas/InstallCertificateUseEnumType"**: 引用 `InstallCertificateUseEnumType` 模式。
      - **certificate (证书):**
        - **描述 (description): "A PEM encoded X.509 certificate."**:  PEM 编码的 X.509 证书。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 5500**: 最大长度为 5500 个字符。
    - **必需属性 (required): ["certificateType", "certificate"]**:  "certificateType" 和 "certificate" 属性是必需的。
    - **标题 (title): "InstallCertificateRequest"**: 模式的标题。

  - **GetCertificateIdUseEnumType (获取证书ID用途枚举类型)**
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["V2GRootCertificate", "MORootCertificate", "CSMSRootCertificate", "V2GCertificateChain", "ManufacturerRootCertificate"]**: 允许的值包括：
      - **"V2GRootCertificate" (V2G 根证书)**
      - **"MORootCertificate" (MO 根证书)**
      - **"CSMSRootCertificate" (CSMS 根证书)**
      - **"V2GCertificateChain" (V2G 证书链)**
      - **"ManufacturerRootCertificate" (制造商根证书)**
    - **标题 (title): "GetCertificateIdUseEnumType"**: 模式的标题。

  - **GetInstalledCertificateIdsRequest (获取已安装证书ID请求)**
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **certificateType (证书类型):**
        - **描述 (description): "Indicates the type of certificates requested. When omitted, all certificate types are requested."**:  指示请求的证书类型。省略时，请求所有类型的证书。
        - **类型 (type): "array"**: 数组类型。
        - **items (items):**
          - **$ref ( \$ref ): "#/components/schemas/GetCertificateIdUseEnumType"**: 数组中的每一项都必须是 `GetCertificateIdUseEnumType` 枚举类型的值。
        - **minItems (minItems): 1**: 数组至少包含 1 项。
    - **标题 (title): "GetInstalledCertificateIdsRequest"**: 模式的标题。

  - **HashAlgorithmEnumType (哈希算法枚举类型)**
    - **描述 (description): "Used algorithms for the hashes provided."**:  用于提供的哈希值的算法。
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["SHA256", "SHA384", "SHA512"]**: 允许的值包括：
      - **"SHA256"**: SHA-256 哈希算法
      - **"SHA384"**: SHA-384 哈希算法
      - **"SHA512"**: SHA-512 哈希算法
    - **标题 (title): "HashAlgorithmEnumType"**: 模式的标题。

  - **CertificateHashDataType (证书哈希数据类型)**
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **hashAlgorithm (哈希算法):**
        - **$ref ( \$ref ): "#/components/schemas/HashAlgorithmEnumType"**: 引用 `HashAlgorithmEnumType` 模式。
      - **issuerNameHash (颁发者名称哈希):**
        - **描述 (description): "Hashed value of the Issuer DN (Distinguished Name)."**:  颁发者 DN (Distinguished Name，专有名称) 的哈希值。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 128**: 最大长度为 128 个字符。
      - **issuerKeyHash (颁发者密钥哈希):**
        - **描述 (description): "Hashed value of the issuers public key"**:  颁发者公钥的哈希值。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 128**: 最大长度为 128 个字符。
      - **serialNumber (序列号):**
        - **描述 (description): "The serial number of the certificate."**:  证书的序列号。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 40**: 最大长度为 40 个字符。
    - **必需属性 (required): ["hashAlgorithm", "issuerNameHash", "issuerKeyHash", "serialNumber"]**:  "hashAlgorithm", "issuerNameHash", "issuerKeyHash", "serialNumber" 属性是必需的。
    - **标题 (title): "CertificateHashDataType"**: 模式的标题。

  - **DeleteCertificateRequest (删除证书请求)**
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **certificateHashData (证书哈希数据):**
        - **$ref ( \$ref ): "#/components/schemas/CertificateHashDataType"**: 引用 `CertificateHashDataType` 模式。
    - **必需属性 (required): ["certificateHashData"]**:  "certificateHashData" 属性是必需的。
    - **标题 (title): "DeleteCertificateRequest"**: 模式的标题。

  - **UpdateTlsCertificateQuerySchema (更新TLS证书查询模式)**
    - **类型 (type): "object"**: 对象类型。
    - **属性 (properties):**
      - **id (ID):**
        - **类型 (type): "string"**: 字符串类型。
    - **必需属性 (required): ["id"]**:  "id" 属性是必需的。
    - **标题 (title): "UpdateTlsCertificateQuerySchema"**: 模式的标题。

  - **TlsCertificateSchema (TLS证书模式)**
    - **类型 (type): "object"**: 对象类型。
    - **属性 (properties):**
      - **certificateChain (证书链):**
        - **类型 (type): "array"**: 数组类型。
        - **items (items):**
          - **类型 (type): "string"**: 数组中的每一项都是字符串类型。
      - **privateKey (私钥):**
        - **类型 (type): "string"**: 字符串类型。
      - **rootCA (根CA证书):**
        - **类型 (type): "string"**: 字符串类型。
      - **subCAKey (子CA密钥):**
        - **类型 (type): "string"**: 字符串类型。
    - **必需属性 (required): ["certificateChain", "privateKey"]**:  "certificateChain" 和 "privateKey" 属性是必需的。
    - **标题 (title): "TlsCertificateSchema"**: 模式的标题。

  - **GenerateCertificateChainSchema (生成证书链模式)**
    - **类型 (type): "object"**: 对象类型。
    - **属性 (properties):**
      - **keyLength (密钥长度):**
        - **类型 (type): "number"**: 数字类型。
      - **organizationName (组织名称):**
        - **类型 (type): "string"**: 字符串类型。
      - **commonName (通用名称):**
        - **类型 (type): "string"**: 字符串类型。
      - **validBefore (有效期至):**
        - **类型 (type): "string"**: 字符串类型。
      - **filePath (文件路径):**
        - **类型 (type): "string"**: 字符串类型。
      - **selfSigned (自签名):**
        - **类型 (type): "boolean"**: 布尔值类型。
      - **countryName (国家名称):**
        - **类型 (type): "string"**: 字符串类型。
      - **signatureAlgorithm (签名算法):**
        - **类型 (type): "string"**: 字符串类型。
      - **pathLen (路径长度):**
        - **类型 (type): "number"**: 数字类型。
    - **必需属性 (required): ["selfSigned", "commonName", "organizationName"]**:  "selfSigned", "commonName", "organizationName" 属性是必需的。
    - **标题 (title): "GenerateCertificateChainSchema"**: 模式的标题。

  - **InstallRootCertificateSchema (安装根证书模式)**
    - **类型 (type): "object"**: 对象类型。
    - **属性 (properties):**
      - **stationId (充电站ID):**
        - **类型 (type): "string"**: 字符串类型。
      - **certificateType (证书类型):**
        - **类型 (type): "string"**: 字符串类型。
      - **tenantId (租户ID):**
        - **类型 (type): "string"**: 字符串类型。
      - **callbackUrl (回调URL):**
        - **类型 (type): "string"**: 字符串类型。
      - **fileId (文件ID):**
        - **类型 (type): "string"**: 字符串类型。
    - **必需属性 (required): ["stationId", "certificateType", "tenantId"]**:  "stationId", "certificateType", "tenantId" 属性是必需的。
    - **标题 (title): "InstallRootCertificateSchema"**: 模式的标题。

  - **APNAuthenticationEnumType (APN 身份验证枚举类型)**
    - **描述 (description): "APN. APN_ Authentication. APN_ Authentication_ Code ... Authentication method."**:  APN (接入点名称) 身份验证方法。
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["CHAP", "NONE", "PAP", "AUTO"]**: 允许的值包括：
      - **"CHAP"**: 挑战握手身份验证协议
      - **"NONE"**: 无身份验证
      - **"PAP"**: 密码验证协议
      - **"AUTO"**: 自动选择
    - **标题 (title): "APNAuthenticationEnumType"**: 模式的标题。

  - **OCPPInterfaceEnumType (OCPP 接口枚举类型)**
    - **描述 (description): "Applicable Network Interface."**:  适用的网络接口。
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["Wired0", "Wired1", "Wired2", "Wired3", "Wireless0", "Wireless1", "Wireless2", "Wireless3"]**: 允许的值包括：
      - **"Wired0"**, **"Wired1"**, **"Wired2"**, **"Wired3"**: 有线接口 0-3
      - **"Wireless0"**, **"Wireless1"**, **"Wireless2"**, **"Wireless3"**: 无线接口 0-3
    - **标题 (title): "OCPPInterfaceEnumType"**: 模式的标题。

  - **OCPPTransportEnumType (OCPP 传输枚举类型)**
    - **描述 (description): "Communication_ Function. OCPP_ Transport. OCPP_ Transport_ Code ... SOAP is not supported in OCPP 2.0..."**:  OCPP 传输协议。定义传输协议 (例如 SOAP 或 JSON)。注意：OCPP 2.0 不支持 SOAP，但其他版本的 OCPP 支持。
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["JSON", "SOAP"]**: 允许的值包括：
      - **"JSON"**: JSON 传输协议
      - **"SOAP"**: SOAP 传输协议 (注意描述中提到 OCPP 2.0 不支持)
    - **标题 (title): "OCPPTransportEnumType"**: 模式的标题。

  - **OCPPVersionEnumType (OCPP 版本枚举类型)**
    - **描述 (description): "Communication_ Function. OCPP_ Version. OCPP_ Version_ Code ... Defines the OCPP version used for this communication function."**:  OCPP 版本。定义用于此通信功能的 OCPP 版本。
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["OCPP12", "OCPP15", "OCPP16", "OCPP20"]**: 允许的值包括：
      - **"OCPP12"**: OCPP 1.2 版本
      - **"OCPP15"**: OCPP 1.5 版本
      - **"OCPP16"**: OCPP 1.6 版本
      - **"OCPP20"**: OCPP 2.0 版本
    - **标题 (title): "OCPPVersionEnumType"**: 模式的标题。

  - **VPNEnumType (VPN 枚举类型)**
    - **描述 (description): "VPN. Type. VPN_ Code ... Type of VPN"**:  VPN 类型。
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["IKEv2", "IPSec", "L2TP", "PPTP"]**: 允许的值包括：
      - **"IKEv2"**: Internet Key Exchange version 2
      - **"IPSec"**: Internet Protocol Security
      - **"L2TP"**: Layer 2 Tunneling Protocol
      - **"PPTP"**: Point-to-Point Tunneling Protocol
    - **标题 (title): "VPNEnumType"**: 模式的标题。

  - **APNType (APN 类型)**
    - **描述 (description): "APN ... Collection of configuration data needed to make a data-connection over a cellular network."**:  APN。建立蜂窝网络数据连接所需的配置数据集合。描述中还包含关于 MCC/MNC 代码用于指定运营商的信息。
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **apn (APN):**
        - **描述 (description): "APN. APN. URI ... The Access Point Name as an URL."**:  APN 名称，以 URL 形式。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 512**: 最大长度为 512 个字符。
      - **apnUserName (APN 用户名):**
        - **描述 (description): "APN. APN. User_ Name ... APN username."**:  APN 用户名。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 20**: 最大长度为 20 个字符。
      - **apnPassword (APN 密码):**
        - **描述 (description): "APN. APN. Password ... APN Password."**:  APN 密码。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 20**: 最大长度为 20 个字符。
      - **simPin (SIM卡 PIN码):**
        - **描述 (description): "APN. SIMPIN. PIN_ Code ... SIM card pin code."**:  SIM 卡 PIN 码。
        - **类型 (type): "integer"**: 整数类型。
      - **preferredNetwork (首选网络):**
        - **描述 (description): "APN. Preferred_ Network. Mobile_ Network_ ID ... Preferred network, written as MCC and MNC concatenated. See note."**:  首选网络，以 MCC (移动国家代码) 和 MNC (移动网络代码) 连接的形式写入。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 6**: 最大长度为 6 个字符。
      - **useOnlyPreferredNetwork (仅使用首选网络):**
        - **描述 (description): "APN. Use_ Only_ Preferred_ Network. Indicator ... Default: false. Use only the preferred Network..."**:  是否仅使用首选网络。默认值为 false。
        - **类型 (type): "boolean"**: 布尔值类型。
        - **default (default): false**: 默认值为 false。
      - **apnAuthentication (APN 身份验证):**
        - **$ref ( \$ref ): "#/components/schemas/APNAuthenticationEnumType"**: 引用 `APNAuthenticationEnumType` 模式。
    - **必需属性 (required): ["apn", "apnAuthentication"]**:  "apn" 和 "apnAuthentication" 属性是必需的。
    - **标题 (title): "APNType"**: 模式的标题。

  - **NetworkConnectionProfileType (网络连接配置文件类型)**
    - **描述 (description): "Communication_ Function ... The NetworkConnectionProfile defines the functional and technical parameters of a communication link."**:  网络连接配置文件定义了通信链路的功能和技术参数。
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **apn (APN):**
        - **$ref ( \$ref ): "#/components/schemas/APNType"**: 引用 `APNType` 模式。
      - **ocppVersion (OCPP 版本):**
        - **$ref ( \$ref ): "#/components/schemas/OCPPVersionEnumType"**: 引用 `OCPPVersionEnumType` 模式。
      - **ocppTransport (OCPP 传输协议):**
        - **$ref ( \$ref ): "#/components/schemas/OCPPTransportEnumType"**: 引用 `OCPPTransportEnumType` 模式。
      - **ocppCsmsUrl (OCPP CSMS URL):**
        - **描述 (description): "Communication_ Function. OCPP_ Central_ System_ URL. URI ... URL of the CSMS(s) that this Charging Station communicates with."**:  充电站与之通信的 CSMS (中央管理系统) 的 URL。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 512**: 最大长度为 512 个字符。
      - **messageTimeout (消息超时):**
        - **描述 (description): "Duration in seconds before a message send by the Charging Station via this network connection times-out. ... use 30 seconds as a starting point."**:  充电站通过此网络连接发送消息后超时的秒数。建议初始设置为 30 秒。
        - **类型 (type): "integer"**: 整数类型。
      - **securityProfile (安全配置文件):**
        - **描述 (description): "This field specifies the security profile used when connecting to the CSMS with this NetworkConnectionProfile."**:  指定使用此网络连接配置文件连接到 CSMS 时使用的安全配置文件。
        - **类型 (type): "integer"**: 整数类型。
      - **ocppInterface (OCPP 接口):**
        - **$ref ( \$ref ): "#/components/schemas/OCPPInterfaceEnumType"**: 引用 `OCPPInterfaceEnumType` 模式。
      - **vpn (VPN):**
        - **$ref ( \$ref ): "#/components/schemas/VPNType"**: 引用 `VPNType` 模式。
    - **必需属性 (required): ["ocppVersion", "ocppTransport", "ocppCsmsUrl", "messageTimeout", "securityProfile", "ocppInterface"]**:  这些属性是必需的。
    - **标题 (title): "NetworkConnectionProfileType"**: 模式的标题。

  - **VPNType (VPN 类型)** (注意，这里定义了两个 VPNType，可能需要根据上下文区分，但从定义上看，下面的 VPNType 看起来更完整，上面的 VPNEnumType 是 VPN 的类型枚举，需要区分)
    - **描述 (description): "VPN ... VPN Configuration settings"**: VPN 配置设置。
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **server (服务器):**
        - **描述 (description): "VPN. Server. URI ... VPN Server Address"**:  VPN 服务器地址。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 512**: 最大长度为 512 个字符。
      - **user (用户):**
        - **描述 (description): "VPN. User. User_ Name ... VPN User"**:  VPN 用户名。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 20**: 最大长度为 20 个字符。
      - **group (组):**
        - **描述 (description): "VPN. Group. Group_ Name ... VPN group."**:  VPN 组名。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 20**: 最大长度为 20 个字符。
      - **password (密码):**
        - **描述 (description): "VPN. Password. Password ... VPN Password."**:  VPN 密码。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 20**: 最大长度为 20 个字符。
      - **key (密钥):**
        - **描述 (description): "VPN. Key. VPN_ Key ... VPN shared secret."**:  VPN 共享密钥。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 255**: 最大长度为 255 个字符。
      - **type (类型):**
        - **$ref ( \$ref ): "#/components/schemas/VPNEnumType"**: 引用 `VPNEnumType` 模式。
    - **必需属性 (required): ["server", "user", "password", "key", "type"]**:  这些属性是必需的。
    - **标题 (title): "VPNType"**: 模式的标题。

  - **SetNetworkProfileRequest (设置网络配置文件请求)**
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **configurationSlot (配置槽位):**
        - **描述 (description): "Slot in which the configuration should be stored."**:  应该存储配置的槽位。
        - **类型 (type): "integer"**: 整数类型。
      - **connectionData (连接数据):**
        - **$ref ( \$ref ): "#/components/schemas/NetworkConnectionProfileType"**: 引用 `NetworkConnectionProfileType` 模式。
    - **必需属性 (required): ["configurationSlot", "connectionData"]**:  "configurationSlot" 和 "connectionData" 属性是必需的。
    - **标题 (title): "SetNetworkProfileRequest"**: 模式的标题。

  - **ClearDisplayMessageRequest (清除显示消息请求)**
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **id (ID):**
        - **描述 (description): "Id of the message that SHALL be removed from the Charging Station."**:  应从充电站移除的消息 ID。
        - **类型 (type): "integer"**: 整数类型。
    - **必需属性 (required): ["id"]**:  "id" 属性是必需的。
    - **标题 (title): "ClearDisplayMessageRequest"**: 模式的标题。

  - **MessagePriorityEnumType (消息优先级枚举类型)**
    - **描述 (description): "If provided the Charging Station shall return Display Messages with the given priority only."**:  如果提供，充电站应仅返回具有给定优先级的显示消息。
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["AlwaysFront", "InFront", "NormalCycle"]**: 允许的值包括：
      - **"AlwaysFront"**: 始终最前
      - **"InFront"**: 前面
      - **"NormalCycle"**: 正常循环
    - **标题 (title): "MessagePriorityEnumType"**: 模式的标题。

  - **MessageStateEnumType (消息状态枚举类型)**
    - **描述 (description): "If provided the Charging Station shall return Display Messages with the given state only."**:  如果提供，充电站应仅返回具有给定状态的显示消息。
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["Charging", "Faulted", "Idle", "Unavailable"]**: 允许的值包括：
      - **"Charging"**: 充电中
      - **"Faulted"**: 故障
      - **"Idle"**: 空闲
      - **"Unavailable"**: 不可用
    - **标题 (title): "MessageStateEnumType"**: 模式的标题。

  - **GetDisplayMessagesRequest (获取显示消息请求)**
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **id (ID):**
        - **描述 (description): "If provided the Charging Station shall return Display Messages of the given ids. ...NumberOfDisplayMessages.maxLimit>>"**:  如果提供，充电站应返回给定 ID 的显示消息。此字段不应包含超过 `NumberOfDisplayMessages.maxLimit` 设置的 ID 数量。
        - **类型 (type): "array"**: 数组类型。
        - **items (items):**
          - **类型 (type): "integer"**: 数组中的每一项都是整数类型。
        - **minItems (minItems): 1**: 数组至少包含 1 项。
      - **requestId (请求ID):**
        - **描述 (description): "The Id of this request."**:  此请求的 ID。
        - **类型 (type): "integer"**: 整数类型。
      - **priority (优先级):**
        - **$ref ( \$ref ): "#/components/schemas/MessagePriorityEnumType"**: 引用 `MessagePriorityEnumType` 模式。
      - **state (状态):**
        - **$ref ( \$ref ): "#/components/schemas/MessageStateEnumType"**: 引用 `MessageStateEnumType` 模式。
    - **必需属性 (required): ["requestId"]**:  "requestId" 属性是必需的。
    - **标题 (title): "GetDisplayMessagesRequest"**: 模式的标题。

  - **PublishFirmwareRequest (发布固件请求)**
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **location (位置):**
        - **描述 (description): "This contains a string containing a URI pointing to a location from which to retrieve the firmware."**:  包含指向固件检索位置的 URI 字符串。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 512**: 最大长度为 512 个字符。
      - **retries (重试次数):**
        - **描述 (description): "This specifies how many times Charging Station must try to download the firmware before giving up. ... how many times it wants to retry."**:  指定充电站放弃之前必须尝试下载固件的次数。如果此字段不存在，则由充电站决定重试次数。
        - **类型 (type): "integer"**: 整数类型。
      - **checksum (校验和):**
        - **描述 (description): "The MD5 checksum over the entire firmware file as a hexadecimal string of length 32."**:  整个固件文件的 MD5 校验和，以 32 个字符的十六进制字符串表示。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 32**: 最大长度为 32 个字符。
      - **requestId (请求ID):**
        - **描述 (description): "The Id of the request."**:  请求的 ID。
        - **类型 (type): "integer"**: 整数类型。
      - **retryInterval (重试间隔):**
        - **描述 (description): "The interval in seconds after which a retry may be attempted. ... how long to wait between attempts."**:  重试尝试的间隔秒数。如果此字段不存在，则由充电站决定尝试之间等待的时间。
        - **类型 (type): "integer"**: 整数类型。
    - **必需属性 (required): ["location", "checksum", "requestId"]**:  "location", "checksum", "requestId" 属性是必需的。
    - **标题 (title): "PublishFirmwareRequest"**: 模式的标题。

  - **MessageFormatEnumType (消息格式枚举类型)**
    - **描述 (description): "Message_ Content. Format. Message_ Format_ Code ... Format of the message."**:  消息格式。
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["ASCII", "HTML", "URI", "UTF8"]**: 允许的值包括：
      - **"ASCII"**: ASCII 格式
      - **"HTML"**: HTML 格式
      - **"URI"**: URI 格式
      - **"UTF8"**: UTF-8 格式
    - **标题 (title): "MessageFormatEnumType"**: 模式的标题。

  - **ComponentType (组件类型)**
    - **描述 (description): "A physical or logical component"**:  物理或逻辑组件。
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **evse (EVSE):**
        - **$ref ( \$ref ): "#/components/schemas/EVSEType"**: 引用 `EVSEType` 模式。
      - **name (名称):**
        - **描述 (description): "Name of the component. ... advised to use Camel Case."**:  组件名称。应尽可能从标准化组件名称列表中获取。建议使用驼峰命名法 (Camel Case)。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 50**: 最大长度为 50 个字符。
      - **instance (实例):**
        - **描述 (description): "Name of instance in case the component exists as multiple instances. ... advised to use Camel Case."**:  如果组件存在多个实例，则为实例名称。建议使用驼峰命名法 (Camel Case)。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 50**: 最大长度为 50 个字符。
    - **必需属性 (required): ["name"]**:  "name" 属性是必需的。
    - **标题 (title): "ComponentType"**: 模式的标题。

  - **EVSEType (EVSE 类型)**
    - **描述 (description): "EVSE ... Electric Vehicle Supply Equipment"**:  EVSE (电动汽车供电设备)。
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **id (ID):**
        - **描述 (description): "Identified_ Object. MRID. Numeric_ Identifier ... EVSE Identifier. ... of the Charging Station."**:  EVSE 标识符。包含一个大于 0 的数字，用于指定充电站的 EVSE。
        - **类型 (type): "integer"**: 整数类型。
      - **connectorId (连接器ID):**
        - **描述 (description): "An id to designate a specific connector (on an EVSE) by connector index number."**:  用于通过连接器索引号指定 EVSE 上特定连接器的 ID。
        - **类型 (type): "integer"**: 整数类型。
    - **必需属性 (required): ["id"]**:  "id" 属性是必需的。
    - **标题 (title): "EVSEType"**: 模式的标题。

  - **MessageContentType (消息内容类型)**
    - **描述 (description): "Message_ Content ... Contains message details, for a message to be displayed on a Charging Station."**:  消息内容。包含消息详细信息，用于在充电站上显示消息。
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **format (格式):**
        - **$ref ( \$ref ): "#/components/schemas/MessageFormatEnumType"**: 引用 `MessageFormatEnumType` 模式。
      - **language (语言):**
        - **描述 (description): "Message_ Content. Language. Language_ Code ... Contains a language code as defined in <<ref-RFC5646,[RFC5646]>>."**:  消息语言标识符。包含 RFC5646 中定义的语言代码。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 8**: 最大长度为 8 个字符。
      - **content (内容):**
        - **描述 (description): "Message_ Content. Content. Message ... Message contents."**:  消息内容。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 512**: 最大长度为 512 个字符。
    - **必需属性 (required): ["format", "content"]**:  "format" 和 "content" 属性是必需的。
    - **标题 (title): "MessageContentType"**: 模式的标题。

  - **MessageInfoType (消息信息类型)**
    - **描述 (description): "Message_ Info ... Contains message details, for a message to be displayed on a Charging Station."**:  消息信息。包含消息详细信息，用于在充电站上显示消息。
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **display (显示组件):**
        - **$ref ( \$ref ): "#/components/schemas/ComponentType"**: 引用 `ComponentType` 模式。
      - **id (ID):**
        - **描述 (description): "Identified_ Object. MRID. Numeric_ Identifier ... Master resource identifier, unique within an exchange context. ..."**:  主资源标识符，在交换上下文中唯一。在 OCPP 上下文中定义为正整数值 (大于等于零)。
        - **类型 (type): "integer"**: 整数类型。
      - **priority (优先级):**
        - **$ref ( \$ref ): "#/components/schemas/MessagePriorityEnumType"**: 引用 `MessagePriorityEnumType` 模式。
      - **state (状态):**
        - **$ref ( \$ref ): "#/components/schemas/MessageStateEnumType"**: 引用 `MessageStateEnumType` 模式。
      - **startDateTime (开始日期时间):**
        - **描述 (description): "Message_ Info. Start. Date_ Time ... From what date-time should this message be shown. If omitted: directly."**:  此消息应从哪个日期时间开始显示。如果省略，则立即显示。
        - **类型 (type): "string"**: 字符串类型。
        - **format (format): "date-time"**: 日期时间格式。
      - **endDateTime (结束日期时间):**
        - **描述 (description): "Message_ Info. End. Date_ Time ... Until what date-time should this message be shown, after this date/time this message SHALL be removed."**:  此消息应显示到哪个日期时间为止，在此日期/时间之后应删除此消息。
        - **类型 (type): "string"**: 字符串类型。
        - **format (format): "date-time"**: 日期时间格式。
      - **transactionId (交易ID):**
        - **描述 (description): "During which transaction shall this message be shown. ... after transaction has ended."**:  在此交易期间应显示此消息。交易结束后，充电站应删除消息。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 36**: 最大长度为 36 个字符。
      - **message (消息内容):**
        - **$ref ( \$ref ): "#/components/schemas/MessageContentType"**: 引用 `MessageContentType` 模式。
    - **必需属性 (required): ["id", "priority", "message"]**:  "id", "priority", "message" 属性是必需的。
    - **标题 (title): "MessageInfoType"**: 模式的标题。

  - **SetDisplayMessageRequest (设置显示消息请求)**
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **message (消息信息):**
        - **$ref ( \$ref ): "#/components/schemas/MessageInfoType"**: 引用 `MessageInfoType` 模式。
    - **必需属性 (required): ["message"]**:  "message" 属性是必需的。
    - **标题 (title): "SetDisplayMessageRequest"**: 模式的标题。

  - **UnpublishFirmwareRequest (取消发布固件请求)**
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **checksum (校验和):**
        - **描述 (description): "The MD5 checksum over the entire firmware file as a hexadecimal string of length 32."**:  整个固件文件的 MD5 校验和，以 32 个字符的十六进制字符串表示。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 32**: 最大长度为 32 个字符。
    - **必需属性 (required): ["checksum"]**:  "checksum" 属性是必需的。
    - **标题 (title): "UnpublishFirmwareRequest"**: 模式的标题。

  - **FirmwareType (固件类型)**
    - **描述 (description): "Firmware ... Represents a copy of the firmware that can be loaded/updated on the Charging Station."**:  固件。表示可以在充电站上加载/更新的固件副本。
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **location (位置):**
        - **描述 (description): "Firmware. Location. URI ... URI defining the origin of the firmware."**:  固件来源的 URI。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 512**: 最大长度为 512 个字符。
      - **retrieveDateTime (检索日期时间):**
        - **描述 (description): "Firmware. Retrieve. Date_ Time ... Date and time at which the firmware shall be retrieved."**:  应检索固件的日期和时间。
        - **类型 (type): "string"**: 字符串类型。
        - **format (format): "date-time"**: 日期时间格式。
      - **installDateTime (安装日期时间):**
        - **描述 (description): "Firmware. Install. Date_ Time ... Date and time at which the firmware shall be installed."**:  应安装固件的日期和时间。
        - **类型 (type): "string"**: 字符串类型。
        - **format (format): "date-time"**: 日期时间格式。
      - **signingCertificate (签名证书):**
        - **描述 (description): "Certificate with which the firmware was signed. ... PEM encoded X.509 certificate."**:  用于签名固件的证书。PEM 编码的 X.509 证书。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 5500**: 最大长度为 5500 个字符。
      - **signature (签名):**
        - **描述 (description): "Firmware. Signature. Signature ... Base64 encoded firmware signature."**:  Base64 编码的固件签名。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 800**: 最大长度为 800 个字符。
    - **必需属性 (required): ["location", "retrieveDateTime"]**:  "location" 和 "retrieveDateTime" 属性是必需的。
    - **标题 (title): "FirmwareType"**: 模式的标题。

  - **UpdateFirmwareRequest (更新固件请求)**
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **retries (重试次数):**
        - **描述 (description): "This specifies how many times Charging Station must try to download the firmware before giving up. ... how long to wait between attempts."**:  指定充电站放弃之前必须尝试下载固件的次数。和重试间隔。
        - **类型 (type): "integer"**: 整数类型。
      - **retryInterval (重试间隔):**
        - **描述 (description): "The interval in seconds after which a retry may be attempted. ... how long to wait between attempts."**: 重试间隔秒数。
        - **类型 (type): "integer"**: 整数类型。
      - **requestId (请求ID):**
        - **描述 (description): "The Id of this request"**:  此请求的 ID。
        - **类型 (type): "integer"**: 整数类型。
      - **firmware (固件):**
        - **$ref ( \$ref ): "#/components/schemas/FirmwareType"**: 引用 `FirmwareType` 模式。
    - **必需属性 (required): ["requestId", "firmware"]**:  "requestId" 和 "firmware" 属性是必需的。
    - **标题 (title): "UpdateFirmwareRequest"**: 模式的标题。

  - **ResetEnumType (重置枚举类型)**
    - **描述 (description): "This contains the type of reset that the Charging Station or EVSE should perform."**:  包含充电站或 EVSE 应执行的重置类型。
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["Immediate", "OnIdle"]**: 允许的值包括：
      - **"Immediate"**: 立即重置
      - **"OnIdle"**: 空闲时重置
    - **标题 (title): "ResetEnumType"**: 模式的标题。

  - **ResetRequest (重置请求)**
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **type (类型):**
        - **$ref ( \$ref ): "#/components/schemas/ResetEnumType"**: 引用 `ResetEnumType` 模式。
      - **evseId (EVSE ID):**
        - **描述 (description): "This contains the ID of a specific EVSE that needs to be reset, instead of the entire Charging Station."**:  包含需要重置的特定 EVSE 的 ID，而不是整个充电站。
        - **类型 (type): "integer"**: 整数类型。
    - **必需属性 (required): ["type"]**:  "type" 属性是必需的。
    - **标题 (title): "ResetRequest"**: 模式的标题。

  - **OperationalStatusEnumType (运营状态枚举类型)**
    - **描述 (description): "This contains the type of availability change that the Charging Station should perform."**:  包含充电站应执行的可用性更改类型。
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["Inoperative", "Operative"]**: 允许的值包括：
      - **"Inoperative"**: 停止运营 (不工作)
      - **"Operative"**: 运营中 (工作)
    - **标题 (title): "OperationalStatusEnumType"**: 模式的标题。

  - **ChangeAvailabilityRequest (更改可用性请求)**
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **evse (EVSE):**
        - **$ref ( \$ref ): "#/components/schemas/EVSEType"**: 引用 `EVSEType` 模式。
      - **operationalStatus (运营状态):**
        - **$ref ( \$ref ): "#/components/schemas/OperationalStatusEnumType"**: 引用 `OperationalStatusEnumType` 模式。
    - **必需属性 (required): ["operationalStatus"]**:  "operationalStatus" 属性是必需的。
    - **标题 (title): "ChangeAvailabilityRequest"**: 模式的标题。

  - **MessageTriggerEnumType (消息触发枚举类型)**
    - **描述 (description): "Type of message to be triggered."**:  要触发的消息类型。
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["BootNotification", "LogStatusNotification", "FirmwareStatusNotification", "Heartbeat", "MeterValues", "SignChargingStationCertificate", "SignV2GCertificate", "StatusNotification", "TransactionEvent", "SignCombinedCertificate", "PublishFirmwareStatusNotification"]**: 允许的值包括：
      - **"BootNotification"**: 启动通知
      - **"LogStatusNotification"**: 日志状态通知
      - **"FirmwareStatusNotification"**: 固件状态通知
      - **"Heartbeat"**: 心跳
      - **"MeterValues"**: 电表值
      - **"SignChargingStationCertificate"**: 签名充电站证书
      - **"SignV2GCertificate"**: 签名 V2G 证书
      - **"StatusNotification"**: 状态通知
      - **"TransactionEvent"**: 交易事件
      - **"SignCombinedCertificate"**: 签名组合证书
      - **"PublishFirmwareStatusNotification"**: 发布固件状态通知
    - **标题 (title): "MessageTriggerEnumType"**: 模式的标题。

  - **TriggerMessageRequest (触发消息请求)**
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **evse (EVSE):**
        - **$ref ( \$ref ): "#/components/schemas/EVSEType"**: 引用 `EVSEType` 模式。
      - **requestedMessage (请求的消息):**
        - **$ref ( \$ref ): "#/components/schemas/MessageTriggerEnumType"**: 引用 `MessageTriggerEnumType` 模式。
    - **必需属性 (required): ["requestedMessage"]**:  "requestedMessage" 属性是必需的。
    - **标题 (title): "TriggerMessageRequest"**: 模式的标题。

  - **RegistrationStatusEnumType (注册状态枚举类型)**
    - **描述 (description): "This contains whether the Charging Station has been registered within the CSMS."**:  包含充电站是否已在 CSMS 中注册。
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["Accepted", "Pending", "Rejected"]**: 允许的值包括：
      - **"Accepted"**: 已接受
      - **"Pending"**: 待处理
      - **"Rejected"**: 已拒绝
    - **标题 (title): "RegistrationStatusEnumType"**: 模式的标题。

  - **StatusInfoType (状态信息类型)**
    - **描述 (description): "Element providing more information about the status."**:  提供关于状态的更多信息的元素。
    - **类型 (type): "object"**: 对象类型。
    - **属性 (properties):**
      - **reasonCode (原因代码):**
        - **描述 (description): "A predefined code for the reason why the status is returned in this response. The string is case-insensitive."**:  用于说明在此响应中返回状态的原因的预定义代码。字符串不区分大小写。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 20**: 最大长度为 20 个字符。
      - **additionalInfo (附加信息):**
        - **描述 (description): "Additional text to provide detailed information."**:  提供详细信息的附加文本。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 512**: 最大长度为 512 个字符。
    - **必需属性 (required): ["reasonCode"]**:  "reasonCode" 属性是必需的。
    - **标题 (title): "StatusInfoType"**: 模式的标题。

  - **BootConfigSchema (启动配置模式)**
    - **描述 (description): "Boot configuration used to determine boot process for a charging station"**: 用于确定充电站启动过程的启动配置。
    - **属性 (properties):**
      - **heartbeatInterval (心跳间隔):**
        - **类型 (type): "integer"**: 整数类型。
      - **bootRetryInterval (启动重试间隔):**
        - **类型 (type): "integer"**: 整数类型。
      - **status (状态):**
        - **$ref ( \$ref ): "#/components/schemas/RegistrationStatusEnumType"**: 引用 `RegistrationStatusEnumType` 模式。
      - **statusInfo (状态信息):**
        - **$ref ( \$ref ): "#/components/schemas/StatusInfoType"**: 引用 `StatusInfoType` 模式。
      - **getBaseReportOnPending (基于待处理项获取基本报告):**
        - **类型 (type): "boolean"**: 布尔值类型。
      - **setVariableIds (设置变量 ID 数组):**
        - **类型 (type): "array"**: 数组类型。
        - **items (items):**
          - **类型 (type): "integer"**: 数组中的每一项都是整数类型。
      - **bootWithRejectedVariables (使用拒绝的变量启动):**
        - **类型 (type): "boolean"**: 布尔值类型。
    - **必需属性 (required): ["status"]**:  "status" 属性是必需的。
    - **类型 (type): "object"**: 对象类型。
    - **标题 (title): "BootConfigSchema"**: 模式的标题。

  - **UpdateChargingStationPasswordQuerySchema (更新充电站密码查询模式)**
    - **类型 (type): "object"**: 对象类型。
    - **属性 (properties):**
      - **callbackUrl (回调 URL):**
        - **类型 (type): "string"**: 字符串类型。
    - **标题 (title): "UpdateChargingStationPasswordQuerySchema"**: 模式的标题。

  - **UpdateChargingStationPasswordRequestSchema (更新充电站密码请求模式)**
    - **类型 (type): "object"**: 对象类型。
    - **属性 (properties):**
      - **stationId (充电站 ID):**
        - **类型 (type): "string"**: 字符串类型。
      - **password (密码):**
        - **类型 (type): "string"**: 字符串类型。
        - **minLength (minLength): 16**: 最小长度为 16 个字符。
        - **maxLength (maxLength): 40**: 最大长度为 40 个字符。
        - *_pattern (pattern): "^[a-zA-Z0-9_\\-_=:+|@.]{16,40}$"**: 正则表达式模式，限制密码字符和长度。
      - **setOnCharger (在充电器上设置):**
        - **类型 (type): "boolean"**: 布尔值类型。
        - **default (default): false**: 默认值为 false。
    - **必需属性 (required): ["stationId"]**:  "stationId" 属性是必需的。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **标题 (title): "UpdateChargingStationPasswordRequestSchema"**: 模式的标题。

  - **NetworkProfileQuerySchema (网络配置文件查询模式)**
    - **类型 (type): "object"**: 对象类型。
    - **属性 (properties):**
      - **stationId (充电站 ID):**
        - **类型 (type): "string"**: 字符串类型。
    - **必需属性 (required): ["stationId"]**:  "stationId" 属性是必需的。
    - **标题 (title): "NetworkProfileQuerySchema"**: 模式的标题。

  - **NetworkProfileDeleteQuerySchema (网络配置文件删除查询模式)**
    - **类型 (type): "object"**: 对象类型。
    - **属性 (properties):**
      - **stationId (充电站 ID):**
        - **类型 (type): "string"**: 字符串类型。
      - **configurationSlot (配置槽位数组):**
        - **类型 (type): "array"**: 数组类型。
        - **items (items):**
          - **类型 (type): "number"**: 数组中的每一项都是数字类型。
    - **必需属性 (required): ["stationId", "configurationSlot"]**:  "stationId" 和 "configurationSlot" 属性是必需的。
    - **标题 (title): "NetworkProfileDeleteQuerySchema"**: 模式的标题。

  - **ChargingProfileKindEnumType (充电配置文件种类枚举类型)**
    - **描述 (description): "Charging_ Profile. Charging_ Profile_ Kind. Charging_ Profile_ Kind_ Code ... Indicates the kind of schedule."**:  充电配置文件种类。指示计划的种类。
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["Absolute", "Recurring", "Relative"]**: 允许的值包括：
      - **"Absolute"**: 绝对
      - **"Recurring"**: 周期性
      - **"Relative"**: 相对
    - **标题 (title): "ChargingProfileKindEnumType"**: 模式的标题。

  - **ChargingProfilePurposeEnumType (充电配置文件目的枚举类型)**
    - **描述 (description): "Charging_ Profile. Charging_ Profile_ Purpose. Charging_ Profile_ Purpose_ Code ... Defines the purpose of the schedule transferred by this profile"**:  充电配置文件目的。定义此配置文件传输的计划的目的。
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["ChargingStationExternalConstraints", "ChargingStationMaxProfile", "TxDefaultProfile", "TxProfile"]**: 允许的值包括：
      - **"ChargingStationExternalConstraints"**: 充电站外部约束
      - **"ChargingStationMaxProfile"**: 充电站最大配置文件
      - **"TxDefaultProfile"**: 交易默认配置文件
      - **"TxProfile"**: 交易配置文件
    - **标题 (title): "ChargingProfilePurposeEnumType"**: 模式的标题。

  - **ChargingRateUnitEnumType (充电速率单位枚举类型)**
    - **描述 (description): "Charging_ Schedule. Charging_ Rate_ Unit. Charging_ Rate_ Unit_ Code ... The unit of measure Limit is expressed in."**:  充电速率单位。限制的计量单位。
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["W", "A"]**: 允许的值包括：
      - **"W"**: 瓦特 (功率单位)
      - **"A"**: 安培 (电流单位)
    - **标题 (title): "ChargingRateUnitEnumType"**: 模式的标题。

  - **CostKindEnumType (费用种类枚举类型)**
    - **描述 (description): "Cost. Cost_ Kind. Cost_ Kind_ Code ... The kind of cost referred to in the message element amount"**:  费用种类。消息元素 "amount" 中提及的费用种类。
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["CarbonDioxideEmission", "RelativePricePercentage", "RenewableGenerationPercentage"]**: 允许的值包括：
      - **"CarbonDioxideEmission"**: 二氧化碳排放量
      - **"RelativePricePercentage"**: 相对价格百分比
      - **"RenewableGenerationPercentage"**: 可再生能源发电量百分比
    - **标题 (title): "CostKindEnumType"**: 模式的标题。

  - **IdTokenEnumType (ID 令牌枚举类型)**
    - **描述 (description): "Enumeration of possible idToken types."**:  可能的 ID 令牌类型枚举。
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["Central", "eMAID", "ISO14443", "ISO15693", "KeyCode", "Local", "MacAddress", "NoAuthorization"]**: 允许的值包括：
      - **"Central"**: 中央授权
      - **"eMAID"**: eMAID (可能是 e-Mobility Account Identifier - 电动汽车账户标识符)
      - **"ISO14443"**: ISO 14443 标准 (近场通信 NFC)
      - **"ISO15693"**: ISO 15693 标准 (射频识别 RFID)
      - **"KeyCode"**: 密钥代码
      - **"Local"**: 本地授权
      - **"MacAddress"**: MAC 地址
      - **"NoAuthorization"**: 无需授权
    - **标题 (title): "IdTokenEnumType"**: 模式的标题。

  - **RecurrencyKindEnumType (重复类型枚举类型)**
    - **描述 (description): "Charging_ Profile. Recurrency_ Kind. Recurrency_ Kind_ Code ... Indicates the start point of a recurrence."**:  重复类型。指示重复的起点。
    - **类型 (type): "string"**: 字符串类型。
    - **枚举 (enum): ["Daily", "Weekly"]**: 允许的值包括：
      - **"Daily"**: 每日
      - **"Weekly"**: 每周
    - **标题 (title): "RecurrencyKindEnumType"**: 模式的标题。

  - **AdditionalInfoType (附加信息类型)**
    - **描述 (description): "Contains a case insensitive identifier to use for the authorization and the type of authorization to support multiple forms of identifiers."**:  包含用于授权的不区分大小写的标识符，以及支持多种形式标识符的授权类型。
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **additionalIdToken (附加 ID 令牌):**
        - **描述 (description): "This field specifies the additional IdToken."**:  指定附加的 ID 令牌。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 36**: 最大长度为 36 个字符。
      - **type (类型):**
        - **描述 (description): "This defines the type of the additionalIdToken. ... agreed upon by all involved parties."**:  定义附加 ID 令牌的类型。这是一个自定义类型，具体实现需要相关各方协商确定。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 50**: 最大长度为 50 个字符。
    - **必需属性 (required): ["additionalIdToken", "type"]**:  "additionalIdToken" 和 "type" 属性是必需的。
    - **标题 (title): "AdditionalInfoType"**: 模式的标题。

  - **ChargingProfileType (充电配置文件类型)**
    - **描述 (description): "Charging_ Profile ... A ChargingProfile consists of ChargingSchedule, describing the amount of power or current that can be delivered per time interval."**:  充电配置文件。一个充电配置文件由充电计划 (ChargingSchedule) 组成，描述了每个时间间隔可以提供的功率或电流。
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **id (ID):**
        - **描述 (description): "Identified_ Object. MRID. Numeric_ Identifier ... Id of ChargingProfile."**:  充电配置文件的 ID。
        - **类型 (type): "integer"**: 整数类型。
      - **stackLevel (堆叠级别):**
        - **描述 (description): "Charging_ Profile. Stack_ Level. Counter ... Lowest level is 0."**:  配置文件在层级堆栈中的级别值。值越高优先级越高，最低级别为 0。
        - **类型 (type): "integer"**: 整数类型。
      - **chargingProfilePurpose (充电配置文件目的):**
        - **$ref ( \$ref ): "#/components/schemas/ChargingProfilePurposeEnumType"**: 引用 `ChargingProfilePurposeEnumType` 模式。
      - **chargingProfileKind (充电配置文件种类):**
        - **$ref ( \$ref ): "#/components/schemas/ChargingProfileKindEnumType"**: 引用 `ChargingProfileKindEnumType` 模式。
      - **recurrencyKind (重复类型):**
        - **$ref ( \$ref ): "#/components/schemas/RecurrencyKindEnumType"**: 引用 `RecurrencyKindEnumType` 模式。
      - **validFrom (生效时间):**
        - **描述 (description): "Charging_ Profile. Valid_ From. Date_ Time ... If absent, the profile is valid as soon as it is received by the Charging Station."**:  配置文件开始生效的时间点。如果缺席，则在充电站收到配置文件后立即生效。
        - **类型 (type): "string"**: 字符串类型。
        - **format (format): "date-time"**: 日期时间格式。
      - **validTo (失效时间):**
        - **描述 (description): "Charging_ Profile. Valid_ To. Date_ Time ... If absent, the profile is valid until it is replaced by another profile."**:  配置文件停止生效的时间点。如果缺席，则在被另一个配置文件替换之前一直有效。
        - **类型 (type): "string"**: 字符串类型。
        - **format (format): "date-time"**: 日期时间格式。
      - **chargingSchedule (充电计划数组):**
        - **类型 (type): "array"**: 数组类型。
        - **items (items):**
          - **$ref ( \$ref ): "#/components/schemas/ChargingScheduleType"**: 数组中的每一项都必须是 `ChargingScheduleType` 模式。 (注意: ChargingScheduleType 模式在此文档片段中不完整，可能在文档的其他部分定义)
        - **minItems (minItems): 1**: 数组至少包含 1 项。
        - **maxItems (maxItems): 3**: 数组最多包含 3 项。
      - **transactionId (交易 ID):**
        - **描述 (description): "SHALL only be included if ChargingProfilePurpose is set to TxProfile. ..."**:  仅当 `ChargingProfilePurpose` 设置为 `TxProfile` 时才应包含。用于将配置文件匹配到特定交易。
        - **类型 (type): "string"**: 字符串类型。
        - **maxLength (maxLength): 36**: 最大长度为 36 个字符。
    - **必需属性 (required): ["id", "stackLevel", "chargingProfilePurpose", "chargingProfileKind", "chargingSchedule"]**:  这些属性是必需的。
    - **标题 (title): "ChargingProfileType"**: 模式的标题。

  - **ChargingSchedulePeriodType (充电计划周期类型)**
    - **描述 (description): "Charging_ Schedule_ Period ... Charging schedule period structure defines a time period in a charging schedule."**:  充电计划周期。充电计划周期结构定义了充电计划中的一个时间段。
    - **类型 (type): "object"**: 对象类型。
    - **additionalProperties (additionalProperties): false**:  不允许额外的未定义的属性。
    - **属性 (properties):**
      - **customData (自定义数据):**
        - **$ref ( \$ref ): "#/components/schemas/CustomDataType"**: 引用 `CustomDataType` 模式。
      - **startPeriod (开始周期):**
        - **描述 (description): "Charging_ Schedule_ Period. Start_ Period. Elapsed_ Time ... The value of StartPeriod also defines the stop time of the previous period."**:  周期的开始时间，以秒为单位，从计划开始算起。`StartPeriod` 的值也定义了上一个周期的停止时间。
        - **类型 (type): "integer"**: 整数类型。
      - **limit (限制):**
        - **描述 (description): "Charging_ Schedule_ Period. Limit. Measure ... Accepts at most one digit fraction (e.g. 8.1)."**:  计划周期内的充电速率限制，单位为适用的 `chargingRateUnit`，例如安培 (A) 或瓦特 (W)。最多接受一位小数 (例如 8.1)。
        - **类型 (type): "number"**: 数字类型。
      - **numberPhases (相位数):**
        - **描述 (description): "Charging_ Schedule_ Period. Number_ Phases. Counter ... numberPhases=3 will be assumed unless another number is given."**:  可用于充电的相位数。如果需要多个相位，除非给出其他数字，否则将假定 `numberPhases=3`。
        - **类型 (type): "integer"**: 整数类型。
      - **phaseToUse (要使用的相位):**
        - **描述 (description): "Values: 1..3, Used if numberPhases=1 and if the EVSE is capable of switching the phase connected to the EV, ... and pha")**:  值：1..3。当 `numberPhases=1` 且 EVSE 能够切换连接到 EV 的相位时使用，即定义了 `ACPhaseSwitchingSupported` 且为 true。 除非上述两个条件都为 true，否则不允许使用。 如果两个条件都为 true，

### ChargingScheduleType (充电计划类型)

- **描述 (description):** "Charging_ Schedule ... Charging schedule structure defines a list of charging periods, as a function of time." 充电计划结构定义了随时间变化的充电周期列表。
- **类型 (type):** "object" (对象类型)
- **additionalProperties (additionalProperties):** false (不允许额外的未定义的属性)
- **属性 (properties):**
  - **chargingSchedulePeriod (充电周期数组):**
    - **类型 (type):** "array" (数组类型)
    - **items (items):**
      - **$ ref (  $ref ):** "#/components/schemas/ChargingSchedulePeriodType" (数组中的每一项都应该是 `ChargingSchedulePeriodType` 模式)
    - **minItems (minItems):** 1 (数组至少包含 1 项)
  - **(推测属性 - 可能不完整或不完全准确，请参考完整文档):**
    - **duration (持续时间):**
      - **类型 (type):** "integer" (整数类型，推测为整数，单位可能是秒)
    - **startSchedule (开始计划时间):**
      - **类型 (type):** "string" (字符串类型，格式可能是 `date-time`)
    - **chargingRateUnit (充电速率单位):**
      - **$ ref (  $ref ):** "#/components/schemas/ChargingRateUnitEnumType" (引用 `ChargingRateUnitEnumType` 模式，定义了充电速率的单位 (瓦特或安培))
    - **minChargingRate (最小充电速率):**
      - **类型 (type):** "number" (数字类型)
- **必需属性 (required):** ["chargingSchedulePeriod", "chargingRateUnit"] (推测必需属性可能包含充电周期和充电速率单位)
- **标题 (title):** "ChargingScheduleType" (模式的标题)

---

### CostType (费用类型)

- **描述 (description):** "Cost ... Cost is expressed in given currency and amount." 费用信息。费用以给定的货币和金额表示。
- **类型 (type):** "object" (对象类型)
- **additionalProperties (additionalProperties):** false (不允许额外的未定义的属性)
- **属性 (properties):**
  - **customData (自定义数据):**
    - **$ ref (  $ref ):** "#/components/schemas/CustomDataType" (引用 `CustomDataType` 模式)
  - **amount (金额):**
    - **描述 (description):** "Cost. Amount. Amount_ Value\nurn:x-oca:ocpp:uid:1:569244\nThe amount value without the currency. May be negative." 费用金额，不包含货币单位。可以是负数。
    - **类型 (type):** "number" (数字类型)
  - **currency (货币):**
    - **描述 (description):** "Cost. Currency. ISO_ 4217_ Alpha_ Currency_ Code\nurn:x-oca:ocpp:uid:1:569245>br>\nA case insensitive currency as defined by ISO 4217 amdmend 160规范。" 费用货币，使用 ISO 4217 标准定义的货币代码（不区分大小写）。
    - **类型 (type):** "string" (字符串类型)
    - **maxLength (maxLength):** 3 (最大长度为 3 个字符)
  - **costKind (费用种类):**
    - **$ ref (  $ref ):** "#/components/schemas/CostKindEnumType" (引用 `CostKindEnumType` 模式，定义了费用的种类)
- **必需属性 (required):** ["amount", "currency", "costKind"] ("amount", "currency", "costKind" 属性是必需的)
- **标题 (title):** "CostType" (模式的标题)

---

### SetChargingProfileRequest (设置充电配置文件请求)

- **类型 (type):** "object" (对象类型)
- **additionalProperties (additionalProperties):** false (不允许额外的未定义的属性)
- **属性 (properties):**
  - **customData (自定义数据):**
    - **$ ref (  $ref ):** "#/components/schemas/CustomDataType" (引用 `CustomDataType` 模式)
  - **evseId (EVSE ID):**
    - **描述 (description):** "The evseId SHALL be 0 for Charging Station and Cable." 对于整个充电站或充电枪缆，`evseId` 应为 0。对于特定的 EVSE 连接器，`evseId` 必须大于 0。
    - **类型 (type):** "integer" (整数类型)
  - **chargingProfile (充电配置文件):**
    - **$ ref (  $ref ):** "#/components/schemas/ChargingProfileType" (引用 `ChargingProfileType` 模式)
- **必需属性 (required):** ["evseId", "chargingProfile"] ("evseId" 和 "chargingProfile" 属性是必需的)
- **标题 (title):** "SetChargingProfileRequest" (模式的标题)

---

### DeleteChargingProfileRequest (删除充电配置文件请求)

- **类型 (type):** "object" (对象类型)
- **additionalProperties (additionalProperties):** false (不允许额外的未定义的属性)
- **属性 (properties):**
  - **customData (自定义数据):**
    - **$ ref (  $ref ):** "#/components/schemas/CustomDataType" (引用 `CustomDataType` 模式)
  - **evseId (EVSE ID):**
    - **描述 (description):** "The evseId SHALL be 0 for Charging Station and Cable." 对于整个充电站或充电枪缆，`evseId` 应为 0。对于特定的 EVSE 连接器，`evseId` 必须大于 0。
    - **类型 (type):** "integer" (整数类型)
  - **chargingProfileId (充电配置文件 ID):**
    - **描述 (description):** "Id of the charging profile to delete." 要删除的充电配置文件的 ID。
    - **类型 (type):** "integer" (整数类型)
  - **chargingProfilePurpose (充电配置文件目的):**
    - **$ ref (  $ref ):** "#/components/schemas/ChargingProfilePurposeEnumType" (引用 `ChargingProfilePurposeEnumType` 模式，允许按目的删除配置文件)
- **标题 (title):** "DeleteChargingProfileRequest" (模式的标题)

---

### GetChargingProfilesRequest (获取充电配置文件请求)

- **类型 (type):** "object" (对象类型)
- **additionalProperties (additionalProperties):** false (不允许额外的未定义的属性)
- **属性 (properties):**
  - **customData (自定义数据):**
    - **$ ref (  $ref ):** "#/components/schemas/CustomDataType" (引用 `CustomDataType` 模式)
  - **requestId (请求 ID):**
    - **描述 (description):** "The Id of this request." 此请求的 ID。
    - **类型 (type):** "integer" (整数类型)
  - **evseId (EVSE ID):**
    - **描述 (description):** "The evseId SHALL be 0 for Charging Station and Cable." 对于整个充电站或充电枪缆，`evseId` 应为 0。对于特定的 EVSE 连接器，`evseId` 必须大于 0。
    - **类型 (type):** "integer" (整数类型)
  - **chargingProfileId (充电配置文件 ID):**
    - **描述 (description):** "Id of the charging profile to retrieve." 要检索的充电配置文件的 ID。
    - **类型 (type):** "integer" (整数类型)
  - **chargingProfilePurpose (充电配置文件目的):**
    - **$ ref (  $ref ):** "#/components/schemas/ChargingProfilePurposeEnumType" (引用 `ChargingProfilePurposeEnumType` 模式，允许按目的过滤配置文件)
- **必需属性 (required):** ["requestId"] ("requestId" 属性是必需的)
- **标题 (title):** "GetChargingProfilesRequest" (模式的标题)

---

### ClearChargingProfileRequest (清除充电配置文件请求)

- **类型 (type):** "object" (对象类型)
- **additionalProperties (additionalProperties):** false (不允许额外的未定义的属性)
- **属性 (properties):**
  - **customData (自定义数据):**
    - **$ ref (  $ref ):** "#/components/schemas/CustomDataType" (引用 `CustomDataType` 模式)
  - **evseId (EVSE ID):**
    - **描述 (description):** "The evseId SHALL be 0 for Charging Station and Cable." 对于整个充电站或充电枪缆，`evseId` 应为 0。对于特定的 EVSE 连接器，`evseId` 必须大于 0。
    - **类型 (type):** "integer" (整数类型)
  - **chargingProfilePurpose (充电配置文件目的):**
    - **$ ref (  $ref ):** "#/components/schemas/ChargingProfilePurposeEnumType" (引用 `ChargingProfilePurposeEnumType` 模式，允许按目的清除配置文件)
- **标题 (title):** "ClearChargingProfileRequest" (模式的标题)

---

### ChargingStationPasswordType (充电站密码类型)

- **类型 (type):** "object" (对象类型)
- **properties (properties):**
  - **stationId (充电站 ID):**
    - **类型 (type):** "string" (字符串类型)
  - **password (密码):**
    - **类型 (type):** "string" (字符串类型)
    - **minLength (minLength):** 16 (最小长度为 16 个字符)
    - **maxLength (maxLength):** 40 (最大长度为 40 个字符)
    - **pattern (pattern):** "^[a-zA-Z0-9*-_=:+|@.]{16,40}$" (正则表达式模式，限制密码字符和长度)
- **required (required):** ["stationId", "password"] ("stationId" 和 "password" 属性是必需的)
- **additionalProperties (additionalProperties):** false (不允许额外的未定义属性)
- **标题 (title):** "ChargingStationPasswordType" (模式的标题)

---

### GetChargingStationWebRequestSchema (获取充电站 Web 请求模式)

- **类型 (type):** "object" (对象类型)
- **properties (properties):**
  - **stationId (充电站 ID):**
    - **类型 (type):** "string" (字符串类型)
- **required (required):** ["stationId"] ("stationId" 属性是必需的)
- **标题 (title):** "GetChargingStationWebRequestSchema" (模式的标题)

---

### ChargingStationWebSchema (充电站 Web 模式)

- **类型 (type):** "object" (对象类型)
- **properties (properties):**
  - **chargingStations (充电站数组):**
    - **类型 (type):** "array" (数组类型)
    - **items (items):**
      - **$ ref (  $ref ):** "#/components/schemas/ChargingStationPasswordType" (数组中的每一项都应该符合 `ChargingStationPasswordType` 模式)
- **标题 (title):** "ChargingStationWebSchema" (模式的标题)

---

### GenerateKeyPairSchema (生成密钥对模式)

- **类型 (type):** "object" (对象类型)
- **properties (properties):**
  - **keyPairLength (密钥对长度):**
    - **类型 (type):** "number" (数字类型)
  - **privateKeyFormat (私钥格式):**
    - **类型 (type):** "string" (字符串类型)
  - **publicKeyFormat (公钥格式):**
    - **类型 (type):** "string" (字符串类型)
  - **privateKeyPath (私钥路径):**
    - **类型 (type):** "string" (字符串类型)
  - **publicKeyPath (公钥路径):**
    - **类型 (type):** "string" (字符串类型)
- **标题 (title):** "GenerateKeyPairSchema" (模式的标题)

---

### KeyPairSchema (密钥对模式)

- **类型 (type):** "object" (对象类型)
- **properties (properties):**
  - **privateKey (私钥):**
    - **类型 (type):** "string" (字符串类型)
  - **publicKey (公钥):**
    - **类型 (type):** "string" (字符串类型)
- **标题 (title):** "KeyPairSchema" (模式的标题)
