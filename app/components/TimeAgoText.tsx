"use client";

import ReactTimeago from "react-timeago";

export default function TimeAgoText({ date }: { date: string }) {
  return <ReactTimeago date={date} />;
}
