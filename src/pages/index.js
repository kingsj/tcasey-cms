import React, { Component } from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import Script from "react-load-script";
import Group from "../components/Group";
import ProjectGrid from "../components/Projects";
import Hero from "../components/Hero";

export const HomePageTemplate = ({
  image,
  title,
  description,
  intro,
  main,
  testimonials
}) => {
  const data = intro.goodies.filter((i, index) => index < 3);

  return (
    <section className="home">
      <div className="container">
        <div className="content">
          <ProjectGrid gridItems={data} />
        </div>
      </div>
    </section>
  );
};

export default class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      scrollY: 0
    };
  }
  handleScroll(e) {
    this.setState({ scrollY: e.currentTarget.scrollY });
  }
  handleScriptLoad() {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
    window.netlifyIdentity.init();
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const { frontmatter } = this.props.data.markdownRemark;
    const { scrollY } = this.state;
    return (
      <section>
        <Hero scrollY={scrollY} />
        <div className="container content">
          <div className="container section is-mobile home-container">
            <div>
              <h2 className="title is-size-2 has-text-weight-bold is-bold-light">
                Some of my Latest Work
              </h2>
              <HomePageTemplate
                image={frontmatter.image}
                title={frontmatter.title}
                description={frontmatter.description}
                intro={frontmatter.intro}
              />
              {/* <p>{description}</p> */}
              <div className="flex-center">
                <Link to="/projects" className="btn-gradient">
                  More Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <div className="container" />
      </section>
    );
  }
}

export const homePageQuery = graphql`
  query HomePage {
    markdownRemark(frontmatter: { path: { eq: "/projects" } }) {
      frontmatter {
        title
        path
        image
        description
        intro {
          goodies {
            image
            title
            year
            role
            path
            class
            color
          }
          heading
          description
        }
      }
    }
  }
`;
