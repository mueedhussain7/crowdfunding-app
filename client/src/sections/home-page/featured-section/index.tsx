import { FeatureStepsProps, FeatureCollectionProps } from "@/types/interfaces";
import { FeatureSteps } from "./FeatureSteps";
import { FeatureCollection } from "./FeatureCollection";

interface FeaturedProps {
  variant?: string;
  data: FeatureStepsProps | FeatureCollectionProps | any;
  loading?: boolean;
}

const Featured: React.FC<FeaturedProps> = ({ variant, data, loading }) => {
  switch (variant) {
    case "steps":
      return <FeatureSteps data={data} />;
    case "collection":
      return <FeatureCollection data={data} loading={loading!!} />;
    default:
      return <div>Default Variant</div>;
  }
};

export { Featured };
