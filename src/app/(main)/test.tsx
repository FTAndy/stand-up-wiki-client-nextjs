import * as React from 'react';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = async (props) => {

  await new Promise((r) => {
    setTimeout(r, 10000)
  })

  return <div>
    <h1>阿老师肯德基阿莱克斯大家阿斯利康多久啊说了大数据</h1>
  </div>;
};

export default App;
