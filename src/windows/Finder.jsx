import WindowControls from "#components/windowControls";
import windowWrapper from "#hoc/windowWrapper";
import { Search } from "lucide-react";
import React from "react";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import { locations } from "#constants";
import clsx from "clsx";

const Finder = () => {
    const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();
  const openItem = (item) => {
    if(item.fileType === "pdf") {
        return openWindow("resume")
    }
    if(item.fileType === "txt") {
        return openWindow("txtfile", item)
    }
    if(item.kind === 'folder') {
        return setActiveLocation(item)
    }
  }
  const renderList = (name, items) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              item.id === activeLocation?.id ? "active" : "not-active"
            )}
          >
            <img src={item.icon} alt={item.name} className="w-4"></img>
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
  if (!activeLocation) return null;

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>
      <div className="bg-white flex flex-1">
        <div className="sidebar">
          {renderList('Favorites' , Object.values(locations))}
          {renderList('Work' , locations.work.children)}
        </div>
        <ul className="content">
            {activeLocation?.children.map((item) =>(
                <li key={item.id} className={clsx(item.position)} onClick={() => openItem(item)}>
                    <img src={item.icon} alt={item.name}></img>
                    <p className="text-sm font-medium truncate">{item.name}</p>
                </li>
            ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = windowWrapper(Finder, "finder");
export default FinderWindow;
