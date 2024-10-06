import React from "react";

export default function BackIcon({ classname }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${classname}`}
    >
      <path
        d="M4.25 12.2744L19.25 12.2744"
        stroke="url(#paint0_linear_349_2322)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.2998 18.2988L4.2498 12.2748L10.2998 6.24976"
        stroke="url(#paint1_linear_349_2322)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_349_2322"
          x1="19.25"
          y1="12.2744"
          x2="4.25"
          y2="12.2744"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FDAD02" />
          <stop offset="1" stop-color="#F66602" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_349_2322"
          x1="10.2998"
          y1="12.2743"
          x2="4.2498"
          y2="12.2743"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FDAD02" />
          <stop offset="1" stop-color="#F66602" />
        </linearGradient>
      </defs>
    </svg>
  );
}
