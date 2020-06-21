import React from 'react';
import Layout from './components/Layout/Layout';
import Content from './components/Content/Content';

const App = (props) => {
    return (
        <div className="app">
            <Layout>
                <Content />
            </Layout>
        </div>
    );
};

export default App;
