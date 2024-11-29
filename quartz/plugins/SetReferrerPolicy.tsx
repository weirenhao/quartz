import React, { useEffect } from 'react';

const SetReferrerPolicy: React.FC = () => {
  useEffect(() => {
    // 在页面加载时，选择所有 img 元素并设置 referrerPolicy
    const images = document.querySelectorAll('img');
    images.forEach((img: HTMLImageElement) => {
      img.referrerPolicy = 'no-referrer';
    });
  }, []); // 空依赖数组确保只在组件加载时运行一次

  return null; // 此组件不需要渲染任何内容
};

export default SetReferrerPolicy;
