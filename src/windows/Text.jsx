import React from 'react';
import windowWrapper from '#hoc/windowWrapper';
import useWindowStore from '#store/window';
import WindowControls from '#components/windowControls';

const Text = () => {
  const { windows } = useWindowStore();
  const { data } = windows.txtfile;

  if (!data) return null;

  const { name, image, subtitle, description } = data;

  return (
    <>
      <div id="window-header" className="relative">
        <WindowControls target="txtfile" />
        <span className="font-semibold text-sm absolute left-1/2 -translate-x-1/2">{name}</span>
      </div>
      <div className="bg-white h-full p-8 overflow-y-auto text-gray-800">
        <div className="max-w-2xl mx-auto">
          {image && (
            <div className="mb-6">
              <img 
                src={image} 
                alt={name} 
                className="w-32 h-32 rounded-full object-cover mx-auto shadow-lg"
              />
            </div>
          )}
          
          <h1 className="text-3xl font-bold mb-2 text-center">{name}</h1>
          
          {subtitle && (
            <p className="text-gray-500 text-center mb-8 text-lg italic">
              {subtitle}
            </p>
          )}

          <div className="space-y-4 leading-relaxed text-lg">
            {Array.isArray(description) && description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const TextWindow = windowWrapper(Text, 'txtfile');
export default TextWindow;
