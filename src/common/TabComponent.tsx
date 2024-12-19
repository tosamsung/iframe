import React, { useState } from 'react';
import { Button } from 'antd';

interface TabComponentProps {
  children: React.ReactNode;
  previousButtonText?: string;
  nextButtonText?: string;
}
const TabComponent: React.FC<TabComponentProps> = React.memo(({
  children,
  previousButtonText = 'Tab trước',
  nextButtonText = 'Tab sau',
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = React.Children.toArray(children) as React.ReactElement[];

  const goToNextTab = () => {
    setActiveTab((prev) => (prev + 1) % tabs.length);
  };

  const goToPreviousTab = () => {
    setActiveTab((prev) => (prev - 1 + tabs.length) % tabs.length);
  };

  return (
    <div className="tab-container">
      {/* Nút chuyển đổi tab */}
      <div style={{ display: 'flex', width: '100%' }}>
        <Button
          onClick={goToPreviousTab}
          style={{
            width: '50%',
            borderRadius: '2',
            borderColor: activeTab === 0 ? '#fff' : "#000000",
            backgroundColor: activeTab === 0 ? '#275c1c' : '#f0fdf4',
          }}
        >
          <span className={ activeTab === 0 ? 'text-white' : ''}>{previousButtonText}</span>

        </Button>
        <Button
          onClick={goToNextTab}
          style={{
            width: '50%',
            borderRadius: '5',
            borderColor: activeTab === 1 ? '#fff' : "#000000",
            backgroundColor: activeTab === 1 ? '#275c1c' : '#f0fdf4',
          }}
        >
          <span className={ activeTab === 1 ? 'text-white' : ''}>{nextButtonText}</span>

        </Button>
      </div>

      {/* Nội dung tab */}
      <div className="tabs-wrapper" style={{ marginTop: '5px' }}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-pane ${activeTab === index ? 'active' : ''}`}
            style={{
              display: activeTab === index ? 'block' : 'none',
              width: '100%',
            }}
          >
            {tab.props.children}
          </div>
        ))}
      </div>
    </div>
  );
});


export default TabComponent;
