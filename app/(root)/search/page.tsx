import { SimpleSearchComponent } from "@/components/simpleSearch";
import { title } from "@/config/primitives";

export default function BlogPage() {
  return (
    <div>
      <h1 className={title()}>search</h1>
      <SimpleSearchComponent />
    </div>
  );
}
