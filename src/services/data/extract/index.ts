import { operations_mock } from "./operation_mock";

interface ExtractGetProps {
  page: number;
  size: number;
}

class Extract {
  async get(params: ExtractGetProps) {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000));

    return {
      data: operations_mock,
      success: true,
      error: null,
    };
  }
}

export default new Extract();
