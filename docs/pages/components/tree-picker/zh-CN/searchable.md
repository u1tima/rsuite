### 禁用搜索框

<!--start-code-->

```js
/**
 * import data from
 * https://github.com/rsuite/rsuite/blob/master/docs/public/data/city-simplified.json
 */

const instance = (
  <TreePicker defaultExpandAll data={data} searchable={false} style={{ width: 246 }} />
);
ReactDOM.render(instance);
```

<!--end-code-->
