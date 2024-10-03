## 好文翻译

### React key 属性：高性能列表的最佳实践

这篇文章讲的是 React 中的 key。一个非常基础，但又总是让人“略懂”的属性。不少人知道应该使用具有唯一性的 id 给它赋值，但对内部的工作细节多少还有些模模糊糊。

#### 写在前头

React 的  key  属性可能是 React 中使用最多的 “自动驾驶 ”功能之一 😅。我们当中有谁能诚实地说，我们他们使用它是因为 “...某些合理的原因”，而不是因为 “eslint rule 正在飙红”呢？
我怀疑大多数人在面对 「为什么 React 需要   key  属性 」这个问题时，会回答 “呃......我们应该把唯一值放在那里，这样 React 才能识别列表项，这样对性能更好”。从技术上讲，这个答案是正确的。 但是 「识别列表项」 到底是什么意思呢？如果我跳过  key  属性会发生什么？应用程序会崩溃吗？如果我在这里输入一个随机字符串会怎样？值的唯一性如何？我可以使用数组的索引值吗？这些选择有什么影响？它们对性能有什么影响？ 让我们一起来研究一下吧！

#### React key 属性是如何工作的

首先，在开始编码之前，让我们先搞清楚理论只是：key  属性是什么，为什么 React 需要它。 简而言之，如果  key  属性存在，React 就会在重渲染时使用它来识别同类型元素
换句话说，只有在重渲染时为了和相邻的同类型元素（即扁平列表）区分时，才需要 key 属性（这一点很重要！）。

重渲染过程的简化算法如下：
首先，React 将生成元素 「之前」和 「之后」的 快照。
其次，React 将尝试识别页面中已经存在的元素，以便重新使用它们，而不是从头开始创建。

如果 key 属性存在，它将假定重渲染 「之前」和「之后」key 相同的项是相同的。
如果 key 属性不存在，它将使用索引作为默认 key。

第三，它会：

删除在重渲染「之前」存在但「之后」不存在的项目——即卸载（unmount）它们。
从头开始创建在「之前」阶段不存在的项目——即加载（mount）它们。
更新 「之前」存在并在 「之后」继续存在的项目——即重新渲染（rerender）它们 。

#### 为什么说随机 key 是糟糕的实践？

让我们先实现一个国家列表。我们将有一个 Item 组件，渲染国家信息：

```jsx
const Item = ({ country }) => {
  return (
    <button className="country-item">
      <img src={country.flagUrl} />
      {country.name}
    </button>
  );
};
```

同时， CountriesList 容器组件来渲染真正的列表:

```jsx
const CountriesList = ({ countries }) => {
  return (
    <div>
      {countries.map((country) => (
        <Item country={country} />
      ))}
    </div>
  );
};
```

React 会发现这里没有 key，于是便会退回到使用国家数组的索引作为 key。
我们的数组没有改变，所以所有项目都将被识别为 "已经存在"，列表项将重渲染。
从本质上讲，这与在 Item 中明确添加 key={index}没有区别。

```jsx
countries.map((country, index) => <Item country={country} key={index} />);
```

现在有趣的部分来了：如果我们不使用索引，而是在 key 属性中填充一些随机字符串呢？

```jsx
countries.map((country, index) => (
  <Item country={country} key={Math.random()} />
));
```

这种情况下:

在每次重新渲染 CountriesList 时，React 将重新生成 key 属性。
由于 key 属性是存在的，React 将使用它作为识别「现有」元素的一种方式。
由于所有的 key 属性都是新的，所有 "之前" 的项都将被视为 "已移除"，每个项都将被视为 "新的"，所以 React 将 unmount 所有列表项并将它们重新 mount 回去。

简而言之：当 CountriesList 组件重新渲染时，每个 Item 都将被销毁并从头开始重新创建。
当我们谈论性能时，与简单的 re-render 相比，组件的重新挂载要昂贵得多。此外，用 React.memo 包装 Item 所带来的所有性能提升都将消失——缓存将不起作用，因为 Item 将在每次重新渲染时重新创建。
看看 codesandbox 中的上述示例。点击按钮重新渲染，注意控制台输出。稍微节流一下 CPU，点击按钮时的延迟甚至可以用肉眼看到！
如何控制 CPU 节流（throttle）
在 Chrome 浏览器的开发工具中打开 "性能 "选项卡，点击右上角的 "齿轮 "图标——它将打开一个额外的面板，"CPU 节流 "是其中的一个选项。

#### 为什么把索引作为 key 也不是好主意？

现在，我们应该很清楚为什么我们需要在重渲染时稳定不变的 "key "属性了。但是数组的 "索引"呢？官方文档中并不推荐使用它们，理由是它们可能会导致错误和影响性能。但是当我们使用索引而不是某个唯一的 id 时，到底发生了什么会导致糟糕的后果呢？
首先，我们不会在上面的示例中看到这些问题。所有这些错误和对性能的影响只发生在 "动态"列表中——在列表中，项的顺序或数量在重新呈现时会发生变化。为了模仿这种情况，让我们为列表实现排序功能：

```jsx
const CountriesList = ({ countries }) => {
  // 引入排序值
  const [sort, setSort] = useState("asc");

  // 根据 state 的值，使用 lodash 的 orderBy 方法来为国家排序
  const sortedCountries = orderBy(countries, "name", sort);

  // 加一个按钮，让 state 的值在升序降序间切换
  const button = (
    <button onClick={() => setSort(sort === "asc" ? "desc" : "asc")}>
      toggle sorting: {sort}
    </button>
  );

  return (
    <div>
      {button}
      {sortedCountries.map((country) => (
        <ItemMemo country={country} />
      ))}
    </div>
  );
};
```

每当我点击按钮，数组的顺序就会颠倒。我将分别以 id 和 索引作为 key 实现列表。
以 country.id 作为 key：

```jsx
sortedCountries.map((country) => (
  <ItemMemo country={country} key={country.id} />
));
sortedCountries.map((country) => (
  <ItemMemo country={country} key={country.id} />
));
```
