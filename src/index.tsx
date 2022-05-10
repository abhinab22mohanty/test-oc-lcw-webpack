import { OmnichannelChatSDK } from "@microsoft/omnichannel-chat-sdk";
import { LiveChatWidget } from "@microsoft/omnichannel-chat-widget";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const getOmnichannelChatConfig = () => {
    // add your own OC setting, hard-coded just for sample, should be replaced with a better handling
    const omnichannelConfig = { 
        orgId: "bfd9d87a-79b7-4bb7-acf0-48b3b855b4da",
        orgUrl: "https://orgf4d9cd3e-crm.omnichannelengagementhub.com",
        widgetId: "d61481fa-2196-4901-aef0-e255707d5c6d"
    };
    return omnichannelConfig;
}

const App = () => {
    const [liveChatWidgetProps, setLiveChatWidgetProps] = useState<any>();

    useEffect(() => {
        const init = async () => {
            const omnichannelConfig = getOmnichannelChatConfig();

            const chatSDK = new OmnichannelChatSDK(omnichannelConfig);
            await chatSDK.initialize();
            const chatConfig = await chatSDK.getLiveChatConfig();

            const liveChatWidgetProps = {
                styleProps: {
                    generalStyles: {
                        width: "400px",
                        height: "600px",
                        bottom: "30px",
                        right: "30px"
                    }
                },
                chatSDK,
                chatConfig,
                webChatContainerProps:{
                    disableMarkdownMessageFormatting : false //setting the default to true for a known issue with markdown
                }
            };

            setLiveChatWidgetProps(liveChatWidgetProps);
        }

        init();
    }, []);

    return (
        <div>
            {liveChatWidgetProps && <LiveChatWidget {...liveChatWidgetProps} />}
        </div>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById("root")
);