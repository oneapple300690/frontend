import Header from '../Header.js';
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function TestPage() {
    // class ContactForm extends React.Component {
    //     constructor(props) {
    //         super(props);
    //         this.state = { firstName: props.firstName, age: props.age, email: props.email };
    //     }
    //     state = {
    //         // Fill in appropriate state properties
    //         // firstName: this.state.firstName,
    //         // age: this.state.age,
    //         // email: this.state.email,
    //     };
    //     render() {
    //         return <div>
    //             <input type='text' value={this.state.firstName} className='firstName' placeholder='Enter First Name'></input>
    //             <input type='text' value={this.state.age} className='age' placeholder='Enter Age'></input>
    //             {

    //                 this.state.age >= 14 ?
    //                     <>
    //                         <input type='text' value={this.state.email} className='email' placeholder='Enter Email'></input>
    //                     </>
    //                     :
    //                     <>

    //                     </>
    //             }


    //         </div>
    //     }
    // }

    // const rootElement = document.getElementById("root");
    // ReactDOM.render(<ContactForm firstName='Beta' age='14'/>, rootElement);
    // return (
    //     <div>
    //         <Header />
    //         <h1 id="root">Test page</h1>
    //     </div>
    // )
    class TabStrip extends React.Component {

        activeIndex = this.props.activeIndex;
        render() {
            return (
                <div className="TabStrip">
                    {this.props.titles.map((title, index) => {
                        const className = "TabStrip-title" +
                            (this.isActive(index) ? " TabStrip-title-active" : "");

                        return (
                            <div onClick={() => this.setActiveIndex(index)} className={className}>
                                {title}
                            </div>
                        );
                    })}
                </div>
            );
        }

        isActive(index) {
            return index === this.getActiveIndex();
        }

        setActiveIndex(activeIndex) {return this.activeIndex = activeIndex}

        getActiveIndex() {return this.activeIndex;}
    }

    class App extends React.Component {
        state = { activeIndex: 1 };
        render() {
            return (<div>
                <TabStrip activeIndex={this.state.activeIndex}
                    onActiveIndexChange={activeIndex => {
                        this.setState({
                            activeIndex
                        });
                    }}
                    titles={["My account", "Settings", "Dashbboard"]}
                />
            </div>);
        }
    }

    const rootElement = document.getElementById("root");
    ReactDOM.render(<App />, rootElement);
    return (
        <div>
            <Header />
            <h1 id="root">Test page</h1>
        </div>
    )
}

export default TestPage