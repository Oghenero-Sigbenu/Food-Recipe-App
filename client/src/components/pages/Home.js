import React, { Component } from "react";
import { connect } from "react-redux";
// import { Spinner } from "reactstrap";

//images
import banner from "../../files/food7.jpg";
import banner1 from "../../files/riceFRied.jpg";
import banner2 from "../../files/banner1.webp";
import banner3 from "../../files/foody1.jpg";

//copmonents
// import Sidebar from "../common/SideBar/SideBar";
// import RecipeCard from "../components/RecipeCard/RecipeCard";
import Footer from "../common/Footer/Footer";
import RecipeCards from "../common/RecipeCards/RecipeCards"
import "../../style.css";

//action
import { getRecipe } from "../../store/action/recipe";
class Home extends Component {
    constructor(props){
        super(props)
          this.state= {
            slide: 0
          }
          this.renderSlide = this.renderSlide.bind(this);
        //   this.next = this.next.bind(this);
        //   this.prev = this.prev.bind(this);
      }

    componentDidMount() {
        this.props.onGetRecipes();
    }
    
    renderSlide() {
        const {slide}  = this.state;
    switch(slide) {
        case 1:
          return(
        <> 
        <div className="banner-image">
            <img src={banner}  alt="foody banner" />
        </div>
        </>
          );
        case 2:
              return(
            <div className="banner-image">
                <img src={banner1}  alt="foody banner" />
            </div>
              );
        case 3:
          return(
            <>
              <div className="banner-image">
                <img src={banner2}  alt="foody banner" />
            </div>
            </>
          )
        default:{
            return (
            <>
            <div className="banner-image">
              <img src={banner3}  alt="foody banner" />
          </div>
          </>
            )
        }
      }
    };

prev = () => {
    const { slide } = this.state;
    if (slide < 1) {
        this.setState({
        slide: 0
        })
    } else {
        this.setState({ slide: slide - 1 })
    }
} 
        next = () => {
        const {slide} = this.state;
          if(slide === 3){
              this.setState({
            slide: 0
          })
        }else {
            this.setState({ slide: slide + 1 })
          }
        };

        setNextImage = ()=>{
            const { slide } = this.state;
        
            if(slide >= 3){
              this.setState({
                slide:0
              })
            }else{
              this.setState({
                slide:slide+1
              })
            }
          }
    render() {
        const rendImage = this.renderSlide()
        setTimeout(this.setNextImage, 10000);
        return (
            <div className="home">
              <div className="banner">
                <div className="banner-text">
                  <h2>Share Your Favourite Recipe With Us</h2>
                  <p>Choose your favourite meals now</p>
                  <button>Explore All</button>
                </div>
                {rendImage}
              </div>
                {/* <div class="menu"></div> */}
                {/* <div className="main-section"> 
                <div className="side-bar">
                      <Sidebar/>
               </div> */}
               <div className="title">
               <button>RECIPES</button>
               </div>
                <div className="recipes">
                <RecipeCards recipes={this.props.recipes} isAuth={this.props.isAuth} user={this.props.userId}  />
                </div> 
                {/* </div> */}
                <div>
                <Footer/>
                </div>
                {/* <section className="phase1">
                    <Sidebar />
                    <div className="recipe">
                        <div className="recipes">
                            {this.props.isLoading ? (
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <Spinner color="dark" />
                                </div>
                            ) : (

                                    <RecipeCard recipes={this.props.recipes} isAuth={this.props.isAuth} userId={this.props.userId}/>

                                )}
                        </div>
                        {this.props.isLoading ? (
                            <h2>Loading, please wait</h2>
                        ):(
                            <button className="show-more">Show more</button>
                        )}
                        </div>
                </section> */}
                {/* <Footer/> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    recipes: state.recipe.recipes,
    isLoading: state.recipe.isLoading,
    isAuth: state.auth.token !== null,
    userId:state.auth.userId

});

const mapDispatchToProps = dispatch => ({
    onGetRecipes: () => dispatch(getRecipe())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);