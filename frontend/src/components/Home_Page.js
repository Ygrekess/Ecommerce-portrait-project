import React, { useEffect, useState } from 'react'
import { ImSpinner8 } from "react-icons/im"
import "../App.css"
import { FiCheckSquare } from "react-icons/fi"
import Axios from "axios";
import { resetListProducts } from '../actions/productActions';
import { useDispatch } from 'react-redux';
import './css/Home_page.css'

export default function Home_Page() {
    
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
        }
    }, [])
    
    return (
            <div>
                <section id="intro" /* style={{backgroundImage:"url('/photos-site/test.png')"}} */>
                    <div className="intro-content" >
                    <h1> Créez LE vêtement qui racontera votre histoire. </h1>
                    <p>Un lieu de naissance, un pays d'origine ou bien n'importe quel autre lieu possédant une signication à vos yeux, emportez le ou que vous soyez.</p>
                    <div>
                        <button id="intro_btn_creerMonModele">Créer mon modèle</button>
                    </div>
                    </div>
                    <img id="photo_intro" src='/img/teeshirt_paris.png' alt=""/>
                    <div id="div_presentation">
                    <div className="div_presentation_1">
                        <img src="https://www.icone-png.com/png/13/13482.png" alt=""/>
                        <h1> Un cadeau original</h1>
                        <p>Offrez à vos proches un cadeau qu'il ne trouveront nulle part ailleurs.</p>
                    </div>
                    <div className="div_presentation_2">
                        <img src="https://image.flaticon.com/icons/png/512/30/30136.png" alt=""/>
                        <h1> Un vêtement 100% personnalisable </h1>
                        <p>Emportez avec vous les lieux et moments importants qui ont marqué votre vie.</p>
                    </div> 
                    <div className="div_presentation_3">
                        <img src="https://image.flaticon.com/icons/png/512/130/130304.png" alt=""/>
                        <h1> Racontez votre histoire </h1>
                        <p>Un lieu de naissance, un pays d'origine, créez LE vêtement qui racontera votre histoire.</p>
                    </div>
                    </div>  
                </section>

                <section id="boutique-header">
                    <div className="boutique-content" >
                        <div className="section-header">
                        <h2> Notre boutique</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quae porro consequatur aliquam, incidunt eius magni provident, doloribus omnis minus ovident, doloribus omnis minus temporibus perferendis nesciunt..</p>
                        </div>
                    </div>
                    <div id="photo_boutique_content">
                    <img id="photo_boutique_1" src="img/leschamps_drapeau.png" alt=""/>
                    <img id="photo_boutique_2" src="img/teeshirt_paris.png" alt=""/>
                    <img id="photo_boutique_3" src="img/leschamps_drapeau.png" alt=""/>
                    </div>
                    <button id="boutique_btn_voirplus">Voir plus de modèles</button>
                </section>

                <section id="reviews">
                    <div className="reviews-content" >
                        <div className="section-header">
                        <h2> Que pensent nos clients </h2>
                        </div>
                        <div className="section-header">
                        <div id="displayReviews"></div>
                        </div>
                    </div>
                </section>

                <section id="about">
                    <div className="about-content" >
                        <div className="section-header">
                        <h2> A propos </h2>
                        </div>
                        <div className="section-body">
                        <div id="about_photo" ><div id="about_photoFilter"></div></div>
                        <div id="about_presentation">
                            <p>C’est en 2017 que notre équipe a mis au monde le projet Map Design, l’outil de création rapide et facile d’une affiche personnalisée unique. Il est né d’une si belle histoire… des Suisses à la recherche d’un cadeau personnalisé plus original que du chocolat et plus réaliste que des montres de luxe. Après de nombreuses années de recherches ardues, en tout cas ce qui nous a paru comme de longues années, nous avons donc eu l’idée d’offrir des cartes personnalisées à nos clients fidèles.
                            <br/>
                            <br/>
                            Le cadeau leur a plu (heureusement !) et à nous aussi (c’est toujours mieux). Nous avons donc voulu rendre accessible à tous des cartes personnalisables de qualité et de partager ainsi notre plaisir avec vous.
                            <br/>
                            <br/>
                            Nous avons donc développé un outil facile d’utilisation qui vous permettra de modifier et personnaliser vos cartes sans connaissances particulières requises et depuis n’importe quel dispositif, incroyable mais vrai !
                            <br/>
                            <br/>
                            Pour commémorer ou se remémorer un évènement majeur d’une vie, une naissance, un mariage ou une réussite particulière par exemple, nos cartes vous offrent cette opportunité.
                            Si vous n’êtes pas d’humeur à célébrer, vous pouvez aussi l’utiliser en tant que décoration d’intérieur ou l’offrir comme cadeau à votre famille ou vos amis.
                            <br/>
                            <br/>
                            Les aventuriers, ne vous inquiétez pas, nous avons pensé à vous aussi ! Ces cartes peuvent être un souvenir de voyage, d’un évènement sportif ou d’un trajet réalisé. Vous pourrez ainsi façonner vous-même votre carte à votre image.
                            </p>
                        </div>
                        </div>
                    </div>
                </section>

                <section id="prefooter">
                    <div id="div_prefooter">
                    <div className="div_prefooter_1">
                        <img src="https://image.flaticon.com/icons/png/512/86/86034.png" alt=""/>
                        <h1> Paiement sécurisé </h1>
                        <p>Offrez à vos proches un cadeau qu'il ne trouveront nulle part ailleurs.</p>
                    </div>
                    <div className="div_prefooter_2">
                        <img src="https://cdn.icon-icons.com/icons2/1456/PNG/512/mbridelivery_99588.png" alt=""/>
                        <h1> Livraison </h1>
                        <p>Emportez avec vous les lieux et moments importants qui ont marqué votre vie.</p>
                    </div> 
                    <div className="div_prefooter_3">
                        <img src="https://icons.iconarchive.com/icons/icons8/windows-8/512/Messaging-Chat-icon.png" alt=""/>
                        <h1> Avis clients </h1>
                        <p>Un lieu de naissance, un pays d'origine, créez LE vêtement qui racontera votre histoire.</p>
                    </div>
                    </div>  
                </section>

                <footer id="footer">
                    <div className="container">
                    <div className="copyright">
                        &copy; Copyright <strong>Topperr</strong>. All Rights Reserved
                    </div>
                    <div className="credits"> 
                        Template by <a href="https://webthemez.com/consulting/">WebThemez</a>
                    </div>
                    </div>
                </footer>
            </div> 
    )
}
