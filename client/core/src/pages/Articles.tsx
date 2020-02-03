import React, { Fragment } from "react";
// eslint-disable-next-line
import { Route, RouteComponentProps, Switch, match } from "react-router";
import ArticleDetail from "../components/article/ArticleDetail";
import ArticleList from "../components/article/ArticleList";
import CreateArticle from "../components/article/CreateArticle";
import EditArticle from "../components/article/EditArticle";
import AppState from "../models/client/AppState";
import ArticleActionCreator from "../models/client/ArticleActionCreator";
import connectPropsAndActions from "../shared/connect";

interface Props extends RouteComponentProps<any> {
    state: AppState;
    actions: ArticleActionCreator;
}

interface States {}

class Articles extends React.Component<Props, States> {
    componentDidMount() {
        if (!this.props.state.articleState.valid) {
            this.props.actions.getArticles();
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.state.articleState.valid && !this.props.state.articleState.valid) {
            this.props.actions.getArticles();
        }

        if ((!prevProps.state.userState.currentUser && this.props.state.userState.currentUser)) {
            this.props.actions.restoreEditCache();
        }
    }
    render(): any {
        const match: match<any> = this.props.match;
        return <Fragment>
            <Switch>
                <Route exact path={match.url} render={(props) => <ArticleList {...props} />} />
                <Route path={`${match.url}/create`} render={(props) => <CreateArticle {...props} />} />
                <Route path={`${match.url}/edit/:articleId`} render={(props) => <EditArticle {...props} />} />
                <Route path={`${match.url}/:articleId`} render={(props) => <ArticleDetail {...props} />} />
            </Switch>
        </Fragment>;
    }
}

export default connectPropsAndActions(Articles);