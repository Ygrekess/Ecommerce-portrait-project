import React, { useEffect, useState } from 'react'
import { ImSpinner8 } from "react-icons/im"
import "../App.css"
import { FiCheckSquare } from "react-icons/fi"
import Axios from "axios";
import { resetListProducts } from '../actions/productActions';
import { useDispatch } from 'react-redux';
import './css/Home_page.css'
import { BsChatSquareDots } from 'react-icons/bs'

export default function Home_Page() {
    
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
        }
    }, [])
    
    return (
            <div className="homepage-content">
                <section id="intro"  /* style={{backgroundImage:"url('/photos-site/homepagetest.png')"}} */>
                    <img id="banniere-img" src="photos-site/homepagetest.png"></img>
                    <div className="intro-content mb-5" >
                        <h1> Créez LE vêtement qui racontera votre histoire. </h1>
                        <p>Un lieu de naissance, un pays d'origine ou bien n'importe quel autre lieu possédant une signication à vos yeux, emportez le ou que vous soyez.</p>
                        <div>
                            <button className="intro_btn_creerMonModele my-5 px-4 py-1 text-uppercase">Voir les modèles</button>
                        </div>
                    </div>
                    <div id="div_presentation" className="m-auto ">
                        <div className="div_presentation_1 m-auto d-flex flex-column justify-content-center align-items-center">
                            <img src="https://www.icone-png.com/png/13/13482.png" alt=""/>
                            <h1> Un cadeau original</h1>
                            <p>Offrez à vos proches un cadeau qu'il ne trouveront nulle part ailleurs.</p>
                        </div>
                        <div className="div_presentation_2 m-auto d-flex flex-column justify-content-center align-items-center">
                            <img src="https://image.flaticon.com/icons/png/512/30/30136.png" alt=""/>
                            <h1> Un vêtement 100% personnalisable </h1>
                            <p>Emportez avec vous les lieux et moments importants qui ont marqué votre vie.</p>
                        </div> 
                        <div className="div_presentation_3 m-auto d-flex flex-column justify-content-center align-items-center">
                            <img src="https://image.flaticon.com/icons/png/512/130/130304.png" alt=""/>
                            <h1> Racontez votre histoire </h1>
                            <p>Un lieu de naissance, un pays d'origine, créez LE vêtement qui racontera votre histoire.</p>
                        </div>
                    </div>  
                </section>

                <section id="boutique-header">
                    <div className="section-header row">
                        <h2 className="m-auto">Des portraits selon vos envies</h2>
                    </div>
                    <div className="photo_boutique_content row justify-content-between my-5 pt-3">
                        <div className="m-auto d-flex flex-column justify-content-center align-items-center">
                            <div className="div_boutique_1">
                                <img src="photos-site/metisse_cartoon.png"></img>
                            </div> 
                            <p>Pour offrir à vos amis ou à vous même.</p> 
                            <ul>
                                <li>loremlorel</li>
                                <li>loremlorel</li>
                                <li>loremlorel</li>
                            </ul>
                            <button className="boutique_btn_voirplus my-5 px-4 py-1 text-uppercase">En savoir plus</button>
                        </div>
                        <div className="m-auto d-flex flex-column justify-content-center align-items-center">
                            <div className="div_boutique_2">
{/*                                 <div className="mask"><h2 className="p-2">Pop art</h2></div>
 */}                                <img src="photos-site/woman.jpg"></img>
                            </div>
                            <p className="">Pour offrir à vos amis ou à vous même.</p> 
                            <ul className="w-100">
                                <li>loremlorel</li>
                                <li>loremlorel</li>
                                <li>loremlorel</li>
                            </ul>
                            <button className="boutique_btn_voirplus my-5 px-4 py-1 text-uppercase">En savoir plus</button>
                        </div> 
                        <div className="m-auto d-flex flex-column justify-content-center align-items-center">
                            <div className="div_boutique_3">
                                <img src="photos-site/femme.jpg"></img>
                            </div>
                            <p>Pour offrir à vos amis ou à vous même.</p> 
                            <ul>
                                <li>loremlorel</li>
                                <li>loremlorel</li>
                                <li>loremlorel</li>
                            </ul>
                            <button className="boutique_btn_voirplus my-5 px-4 py-1 text-uppercase">En savoir plus</button>
                        </div>
                    </div>
                </section>

                <section id="modele">
                    <div className="section-header row my-5">
                        <h2 className="m-auto"> Nos modèles </h2>
                    </div>    
                    <div className="modele-content row">
                        <div className="left-content col-lg-4 col-md-4 col-10">
                            <div className="top">
                            
                            </div>
                            <div className="bottom">
                                
                            </div>
                        </div>
                        <div className="middle-content col-lg-4 col-md-4 col-10"></div>
                        <div className="right-content col-lg-4 col-md-4 col-10">
                            <div className="top">
                            
                            </div>
                            <div className="bottom">
                                
                            </div>
                        </div>
                    </div>

                </section>
            
                <section id="reviews" className="my-5">
                    <div className="reviews-content" >
                        <div className="section-header">
                            <h2> Que pensent nos clients </h2>
                        </div>
                        <div className="section-reviews mt-4">
                            <div id="displayReviews" className="d-flex flex-column justify-content-around align-items-center mx-auto py-3">
                                <BsChatSquareDots size={50}/>
                                <p>C'était parfait !</p>
                                <p><strong>Anne-Sophie</strong></p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="about" className="my-5">
                    <div className="about-content">
                        <div className="section-header">
                            <h2> A propos </h2>
                        </div>
                        <div className="section-body">
                            <div id="about_presentation">
                                <div className="about_photoFilter my-3 mr-5 mx-sm-5">
                                    <img src="photos-site/bureau_homepage.jpg"></img>
                                </div>
                                <p>C’est en 2017 que notre équipe a mis au monde le projet Map Design, l’outil de création rapide et facile d’une affiche personnalisée unique. Il est né d’une si belle histoire… des Suisses à la recherche d’un cadeau personnalisé plus original que du chocolat et plus réaliste que des montres de luxe. Après de nombreuses années de recherches ardues, en tout cas ce qui nous a paru comme de longues années, nous avons donc eu l’idée d’offrir des cartes personnalisées à nos clients fidèles.
                                <br />
                                <br/>
                                Le cadeau leur a plu (heureusement !) et à nous aussi (c’est toujours mieux). Nous avons donc voulu rendre accessible à tous des cartes personnalisables de qualité et de partager ainsi notre plaisir avec vous.
                                <br/>
                                <br/>
                                Nous avons donc développé un outil facile d’utilisation qui vous permettra de modifier et personnaliser vos cartes sans connaissances particulières requises et depuis n’importe quel dispositif, incroyable mais vrai !
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="prefooter">
                    <div id="div_prefooter">
                        <div className="div_prefooter_1">
                            <img src="https://image.flaticon.com/icons/png/512/86/86034.png" className="m-auto" alt=""/>
                            <h1> Paiement sécurisé </h1>
                            <p>Offrez à vos proches un cadeau qu'il ne trouveront nulle part ailleurs.</p>
                        </div>
                        <div className="div_prefooter_2">
                            <img src="https://cdn.icon-icons.com/icons2/1456/PNG/512/mbridelivery_99588.png" className="m-auto" alt=""/>
                            <h1> Livraison </h1>
                            <p>Emportez avec vous les lieux et moments importants qui ont marqué votre vie.</p>
                        </div> 
                        <div className="div_prefooter_3">
                            <img src="https://icons.iconarchive.com/icons/icons8/windows-8/512/Messaging-Chat-icon.png" className="m-auto" alt=""/>
                            <h1> Avis clients </h1>
                            <p>Un lieu de naissance, un pays d'origine, créez LE vêtement qui racontera votre histoire.</p>
                        </div>
                    </div>  
                </section>
            </div> 
    )
}
