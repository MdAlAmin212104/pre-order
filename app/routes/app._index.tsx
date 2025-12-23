/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  ActionFunctionArgs,
  HeadersFunction,
  LoaderFunctionArgs,
} from "react-router";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import HeadingInfo from "./pages/Dashboards/Heading";
import Summery from "./pages/Dashboards/Summery";
import RecentOrders from "./pages/Dashboards/RecentOrders";
import SetupPreview from "./pages/Dashboards/SetupPreview";
import Metrics from "./pages/Dashboards/Metrics";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  await authenticate.admin(request);
  return null;
};

export default function Index() {
  

  return (
    <s-page heading="Shopify app template">
      <HeadingInfo />
      <SetupPreview/> 
      <Metrics/>
      <RecentOrders/>
    </s-page>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
