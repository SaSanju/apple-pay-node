require('dotenv').config();

var preAuthJson = {
    "TransRequest": {
        "CorpID": process.env.AURUS_PAY_CORP_ID,
        "PONumber": "",
        "ClerkID": "",
        "TransactionType": "04",
        "OrigAurusPayTicketNum": "",
        "ProcessingMode": "",
        "PostAuthSequenceNo": "00",
        "ProcessorToken": "",
        "Level3ProductsData": {
            "Level3Products": {
                "Level3Product": {
                    "L3ProductDescription": "",
                    "L3UnitOfMeasure": "O",
                    "L3FreightAmount": "00",
                    "L3ProductTaxRate": "",
                    "L3OrderRefNumber": "",
                    "L3ClassID": "",
                    "L3ProductQuantity": "1",
                    "L3OtherAmount": "00",
                    "L3ProductDiscount": "00",
                    "L3ProductCode": "Product Code",
                    "L3ProductUnitPrice": "200.00",
                    "L3ProductTax": "00",
                    "L3ProductTotalAmount": "200.00",
                    "L3ProductName": "Product 1",
                    "L3DepartmentID": "",
                    "L3TarriffAmount": "00",
                    "L3ProductSeqNo": "001",
                    "L3GiftWrapAmount": "00",
                    "L3MonogramAmount": "00"
                }
            },
            "Level3ProductCount": "1"
        },
        "LanguageIndicator": "00",
        "BillingAddress": {
            "BillingAddressLine1": "Boston",
            "BillingAddressLine2": "",
            "BillingCountry": "in",
            "BillingEmailId": "abc@gmail.com",
            "BillingCity": "pune",
            "BillingMobileNumber": "9876543210",
            "BillingFirstName": "Tom",
            "BillingLastName": "Cruze",
            "BillingZip": "85284",
            "BillingState": "mh"
        },
        "CurrencyCode": "840",
        "PostAuthCount": "",
        "CardType": "",
        "OrigTransactionIdentifier": "",
        "CardExpiryDate": "",
        "InvoiceNumber": "12345787",
        "KI": "",
        "TransactionDate": "02132020",
        "KeyedEntryAVSFlag": "N",
        "SubTransType": "",
        "ReferenceNumber": "",
        "ECOMMInfo": {
            "OneTimeToken": "",
            "StoreId": "",
            "CardIdentifier": "",
            "MerchantIdentifier": "",
            "OneOrderToken": "",
            "TerminalId": ""
        },
        "ApprovalCode": "",
        "PODate": "",
        "TransactionTime": "130214",
        "SettlementInfo": {
            "TransactionDescription": "",
            "PromotionCode": "",
            "InCircleAmount": "",
            "MerchantTransactionCode": "",
            "SalesCheckNumber": "",
            "CreditPlan": ""
        },
        "ThirdPartyURL": "",
        "TransAmountDetails": {
            "TaxAmount": "0.00",
            "ProductTotalAmount": "00.00",
            "Discount": "0.00",
            "TransactionTotal": "200.00"
        },
        "ShippingAddress": {
            "ShippingAddressLine1": "",
            "ShippingEmailId": "",
            "ShippingFirstName": "",
            "ShippingZip": "",
            "ShippingCountry": "",
            "ShippingCity": "",
            "ShippingState": "",
            "ShippingMobileNumber": "",
            "ShippingLastName": ""
        },
        "AdditionalTags": {
            "Tags": {
                "Tag": [
                    {
                        "Value": "",
                        "Key": "ProcessorReturnAci"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorAuthSourceCode"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorResponseCode"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorApprovalCode"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorAvsResultCode"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorTransIdentifier"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorValidationCode"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorCommercialCardIndicator"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorSpendQualifierIndicator"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorMasterCardTic"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorAcquirerReferenceNumber"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorCreditPlan"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorPromoCode"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorSalesDate"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorDeliveryDate"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorSalesRepID"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorTransTime"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorMerchantTransCode"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorModelNumber"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorProductNumber"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorMiscIndicator"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorSalescheckNumber"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorPurchaseOrderNum"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorTransactionDesc"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorModelYear"
                    },
                    {
                        "Value": "",
                        "Key": "ProcessorRnn"
                    }
                ]
            }
        },
        "WalletIdentifier": "7",
        "AurusPayTicketNum": "000000000000000000"
    }
}

module.exports = preAuthJson;