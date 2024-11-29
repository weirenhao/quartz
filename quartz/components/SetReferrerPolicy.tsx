import { QuartzComponentProps } from 'quartz/components'; // 假设你的组件库是这样导入的
import { Node } from 'hast';

interface Options {
  referrerPolicy: string;
}

const defaultOptions: Options = {
  referrerPolicy: 'no-referrer', // 默认使用 no-referrer 策略
};

// Quartz 组件构造函数
export default ((userOpts?: Options) => {
  const opts = { ...defaultOptions, ...userOpts };

  function ReferrerPolicyComponent(props: QuartzComponentProps) {
    // 获取 AST 树中的所有 img 标签，并为它们添加 referrerPolicy 属性
    const { tree } = props;

    // 遍历树，修改 img 标签
    function modifyImgNodes(node: Node): Node {
      if (node.type === 'element' && node.tagName === 'img') {
        // 确保每个 img 元素都包含 referrerPolicy 属性
        if (!node.properties) {
          node.properties = {};
        }
        node.properties.referrerPolicy = opts.referrerPolicy;
      }

      // 如果该节点有子节点，则递归修改
      if (node.children) {
        node.children = node.children.map(modifyImgNodes);
      }

      return node;
    }

    // 对 AST 树中的所有节点进行处理
    const modifiedTree = modifyImgNodes(tree);

    // 这里返回一个渲染后的组件，实际操作中你可以将修改后的 AST 渲染成 JSX
    return (
      <div>
        {/* 渲染修改后的 tree, 这里假设你有办法渲染修改过的 AST */}
        {/* <YourRenderingComponent tree={modifiedTree} /> */}
        <p>所有 img 元素已更新 referrerPolicy 为: {opts.referrerPolicy}</p>
      </div>
    );
  }

  return ReferrerPolicyComponent;
}) satisfies QuartzComponentConstructor;
