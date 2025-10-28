import { APP_FEATURES } from "@/consts";
import { features } from "process";
import React from "react";
import { Spacer } from "../ui/spacer";

export function FeaturesSection() {
  return (
    <div id="features">
      <Spacer lg={20} md={20} sm={16} />
      <h5 className="font-[family-name:var(--font-playwrite)] font-bold">
        App Features
      </h5>
      <Spacer sm={6} md={6} lg={6} />
      <ul className="dark:text-white">
        {APP_FEATURES.map((feature, index) => {
          return (
            <li key={feature.name}>
              <h6 className="text-xl mt-2">{feature.name}</h6>

              <ul className="mt-2">
                {feature.features.map((f) => {
                  return <li key={f}> • {f}</li>;
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
