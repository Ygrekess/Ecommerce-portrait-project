import React, { useEffect } from 'react';
import "../App.css";
import './css/Home_page.css';
import { BsChatSquareDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Modele_Card from './Modele/Modele_Card';
import { listProducts, resetListProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

export default function Home_Page() {

    const dispatch = useDispatch();
    const productList = useSelector(state => state.listProducts);
    const { error, loading, products } = productList;
    
    useEffect(() => {
        console.log(products)
        dispatch(listProducts());
        return () => {
            dispatch(resetListProducts());
        };
    }, []);

    return (
            <div className="homepage-content">
                <section id="intro">
                    <img id="banniere-img" src="/photos-site/homepagetest.png"></img>
                    <div className="intro-content mb-5" >
                        <h1> Offrez le portrait de votre choix. </h1>
                        <p> On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même..</p>
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
                            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F512%2F492%2F492688.png&f=1&nofb=1" alt=""/>
                            <h1> Un tableau 100% personnalisé </h1>
                            <p>Commandez et affichez chez vous un tableau unique.</p>
                        </div> 
                        <div className="div_presentation_3 m-auto d-flex flex-column justify-content-center align-items-center">
                            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F512%2F492%2F492713.png&f=1&nofb=1" alt=""/>
                            <h1> Une photo </h1>
                            <p> Envoyez nous une simple photo et nos designers se chargeront du reste. </p>
                        </div>
                    </div>  
                </section>

                <section id="boutique-header">
                    <div className="section-header row">
                        <h2 className="m-auto">Des portraits selon vos envies</h2>
                    </div>
                    <div className="photo_boutique_content row justify-content-between my-5 pt-3">
                        <div className="m-auto d-flex flex-column justify-content-center align-items-center">
                            <div className="div_boutique">
                                <img src="/photos-site/pop-art.png"></img>
                                <div className='div-title m-auto d-flex align-items-center'>
                                    <h4 className='m-auto text-white p-2'>Pop art</h4>
                                </div>
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
                            <div className="div_boutique">
                                <img src="/photos-site/tete-cartoon-1.png"></img>
                                <div className='div-title m-auto d-flex align-items-center'>
                                    <h4 className='m-auto text-white p-2'>Cartoon</h4>
                                </div>
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
                            <div className="div_boutique">
                                <img src="/photos-site/portrait-design.jpeg"></img>
                                <div className='div-title m-auto d-flex align-items-center'>
                                    <h4 className='m-auto text-white p-2'>Autres</h4>
                                </div>
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

                {
                !loading &&
                <section id="modele">
                    <div className="section-header row my-5">
                        <h2 className="m-auto"> Nos modèles </h2>
                    </div>    
                    <div className="modele-content row">
                        <div className="left-content">
                            <div className="top d-flex flex-column justify-content-around align-items-center">
                                {
                                    <Modele_Card product={products[0]}/>
                                }
                            </div>
                            <div className="bottom mt-5 d-flex flex-column justify-content-around align-items-center">
                                {
                                    <Modele_Card product={products[1]}/>
                                }                              
                            </div>
                        </div>
                        <div className="middle-content d-flex flex-column justify-content-around align-items-center">
                            <div className="top d-flex flex-column justify-content-around align-items-center">
                                {
                                    <Modele_Card product={products[6]}/>
                                }                      
                            </div>
                            <div className="bottom mt-5 d-flex flex-column justify-content-around align-items-center">
                                {
                                    <Modele_Card product={products[7]}/>
                                }
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="top d-flex flex-column justify-content-around align-items-center">
                                {
                                    <Modele_Card product={products[3]}/>
                                }                      
                            </div>
                            <div className="bottom mt-5 d-flex flex-column justify-content-around align-items-center">
                                {
                                    <Modele_Card product={products[4]}/>
                                }
                            </div>
                        </div>
                    </div>
                </section>
                }
            
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
                                <p>
                                    On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à leur phase de construction. Plusieurs versions sont apparues avec le temps, parfois par accident, souvent intentionnellement (histoire d'y rajouter de petits clins d'oeil, voire des phrases embarassantes).
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
                            <p>On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions.</p>
                        </div>
                        <div className="div_prefooter_2">
                            <img src="https://cdn.icon-icons.com/icons2/1456/PNG/512/mbridelivery_99588.png" className="m-auto" alt=""/>
                            <h1> Livraison </h1>
                            <p>On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions.</p>
                        </div> 
                        <div className="div_prefooter_3">
                            <img src="https://icons.iconarchive.com/icons/icons8/windows-8/512/Messaging-Chat-icon.png" className="m-auto" alt=""/>
                            <h1> Avis clients </h1>
                            <p>On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions.</p>
                        </div>
                    </div>  
                </section>
            </div> 
    )
}
