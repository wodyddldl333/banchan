import React, { useState } from "react";
import ControlPanels from "./ControlPanels";
import { IconName } from "../../Types";
const Test: React.FC = () => {
  const [activeIcons, setActiveIcons] = useState<Record<IconName, boolean>>({
    record_voice_over: false,
    mic: false,
    videocam: false,
    headset_mic: false,
    exit_to_app: false,
    book: false,
    group: false,
    chat_bubble: false,
    notifications: false,
    radio_button_checked: false,
    radio_button_unchecked: false,
    mail: false,
  });
  return (
    <div>
      <ControlPanels
        onChatToggle={() => {}}
        activeIcons={activeIcons}
        handleButtonClick={() => {}}
      />
    </div>
  );
};

export default Test;
