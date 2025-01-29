class MWToGitHub{
    static getModalWindow(){
        let modalWindow = document.getElementById(mwToGitHub.MW_ID);
        if(!modalWindow){
            //MainEl
            modalWindow = document.createElement('div');
            modalWindow.hidden = false;//⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
            modalWindow.id = mwToGitHub.MW_ID;
            //imgEl
            let imgEl = document.createElement('img');
            imgEl.classList.add(mwToGitHub.IMG_class);
            imgEl.draggable = false;
            mwToGitHub.IMG_EL = imgEl;
            //text_main
            let textEl = document.createElement('p');
            textEl.innerText = mwToGitHub.text;
            //text_userNameEl
            let userNameEl = document.createElement('span');
            userNameEl.classList.add(mwToGitHub.GitHubUserNameElClass);
            mwToGitHub.GitHubUserNameEl = userNameEl;
            //data_labelEl
            let data_labelEl = document.createElement('p');
            data_labelEl.classList.add(mwToGitHub.data_labelClass);

            let data_label_public_reposEl = document.createElement('span');
            data_label_public_reposEl.innerText = mwToGitHub.public_repos_label;
            data_label_public_reposEl.classList.add(mwToGitHub.public_reposElClass);

            let data_label_followersEl = document.createElement('span');
            data_label_followersEl.innerText = mwToGitHub.followers_label;
            data_label_followersEl.classList.add(mwToGitHub.followersElClass);

            let data_label_followingEl = document.createElement('span');
            data_label_followingEl.innerText = mwToGitHub.following_label;
            data_label_followingEl.classList.add(mwToGitHub.followingElClass);


            data_labelEl.appendChild(data_label_public_reposEl);
            data_labelEl.appendChild(data_label_followersEl);
            data_labelEl.appendChild(data_label_followingEl);
            //dataEl
            let dataEl = document.createElement('p');
            dataEl.classList.add(mwToGitHub.dataElClass);

            let public_reposEl = document.createElement('span');
            public_reposEl.classList.add(mwToGitHub.public_reposElClass);
            public_reposEl.innerText = '';

            let followersEl = document.createElement('span');
            followersEl.classList.add(mwToGitHub.followersElClass);
            followersEl.innerText = '';

            let followingEl = document.createElement('span');
            followingEl.classList.add(mwToGitHub.followingElClass);
            followingEl.innerText = '';

            dataEl.appendChild(public_reposEl);
            dataEl.appendChild(followersEl);
            dataEl.appendChild(followingEl);

            mwToGitHub.public_reposEl = public_reposEl;
            mwToGitHub.followersEl = followersEl;
            mwToGitHub.followingEl = followingEl;
            //bioEl
            let bioEl = document.createElement('p');
            bioEl.classList.add(mwToGitHub.bioElClass);
            bioEl.innerText = '';

            mwToGitHub.bioEl = bioEl;
            //
            modalWindow.appendChild(imgEl);
            textEl.appendChild(userNameEl);
            modalWindow.appendChild(textEl);
            modalWindow.appendChild(data_labelEl);
            modalWindow.appendChild(dataEl);
            modalWindow.appendChild(bioEl);
        }
        return modalWindow;
    }
    static getGitHubUserName(){//压缩来自FastLinkToGitHub
        let userName = undefined;
        //方案1:meta[name='author'content='github@userName']
        let meta_author=document.querySelector('meta[name="author"]');
        if(meta_author){let meta_authorcontent=meta_author.getAttribute
        ('content');let data=meta_authorcontent.split('@');if(data[0].
        toLowerCase()=='github'&&data[1]){userName=data[1];}}
        //方案2.1:meta[name=匹配前有author后有GitHub的字符串content='userName']
        let metas=document.getElementsByTagName('meta');for(let i=0;i<
        metas.length&&!userName;i++){let meta=metas[i];let metaName=
        meta.name.toLowerCase();if(metaName.includes('author')&&metaName.
        includes('github')){userName=meta.getAttribute('content');}}
        //方案2.2:meta[name=匹配GitHub的字符串content='userName']
        const isMatchHasOnlyGithub=false;for(let i=0;i<metas.length&&!
        userName&&isMatchHasOnlyGithub;i++){let meta=metas[i];let metaName
        =meta.name.toLowerCase();if(metaName.includes('github')){userName
        =meta.getAttribute('content');}}return userName;
    }
    static async getGitHubUserData(){
        const GitHubAPI = 'https://api.github.com/users/';
        if(!mwToGitHub.GitHubUserName){console.log('请求数据:无用户名');return;}
        let url = GitHubAPI+mwToGitHub.GitHubUserName;
        let reponse = await fetch(url);
        let data = await reponse.json();
        //添加数据
        mwToGitHub_ajaxData.IMG_URL = data.avatar_url;
        mwToGitHub_ajaxData.public_repos = data.public_repos;
        mwToGitHub_ajaxData.followers = data.followers;
        mwToGitHub_ajaxData.following = data.following;
        mwToGitHub_ajaxData.bio = data.bio;
        //更改DOM
        if(document.readyState == "complete")
        {this.addDataToElement();}else{document.
        addEventListener("DOMContentLoaded",this
        .addDataToElement())}
    }
    static addDataToElement(){
        mwToGitHub.IMG_EL.src = mwToGitHub_ajaxData.IMG_URL;
        mwToGitHub.public_reposEl.innerHTML = mwToGitHub_ajaxData.public_repos;
        mwToGitHub.followersEl.innerHTML = mwToGitHub_ajaxData.followers;
        mwToGitHub.followingEl.innerHTML = mwToGitHub_ajaxData.following;
        mwToGitHub.bioEl.innerHTML = mwToGitHub_ajaxData.bio;
    }
}
const mwToGitHub = {
    MW_ID:'ModalWindowToGitHub',
    IMG_class:'github-user-img',
    GitHubUserNameElClass:'github-user-name',
    text:'',

    data_labelClass:'data-label',
    public_repos_label:'存储库',
    followers_label:'跟随者',
    following_label:'关注者',

    dataElClass:'data',
    public_reposElClass:'public_repos',
    followersElClass:'followers',
    followingElClass:'following',
    bioElClass:'bio',

    GitHubUserName:undefined,

    EL:null,
    IMG_EL:null,
    GitHubUserNameEl:null,

    public_reposEl:null,
    followersEl:null,
    followingEl:null,
    bioEl:null,
};
const mwToGitHub_ajaxData = {
    isLoaded:false,
    IMG_URL:null,
    public_repos:null,
    followers:null,
    following:null,
    bio:null,
}
mwToGitHub.EL = MWToGitHub.getModalWindow();
mwToGitHub.GitHubUserName = MWToGitHub.getGitHubUserName();
mwToGitHub.GitHubUserNameEl.innerText = mwToGitHub.GitHubUserName;

if(document.readyState === 'loading'){window.addEventListener(
'DOMContentLoaded',()=>{document.body.appendChild(mwToGitHub.EL
);})}else{document.body.appendChild(mwToGitHub.EL);}
/*
    大致结构
    <div id="ModalWindowToGitHub">
        <img class="github-user-img"></img>
        <p>
            <span class="github-user-name"></span>
        </p>
        <p class='data-label'>
            <span class="public_repos"></span>
            <span class="followers"></span>
            <span class="following"></span>
        </p>
        <p class='data'>
            <span class="public_repos"></span>
            <span class="followers"></span>
            <span class="following"></span>
        </p>
        <p class='bio'></p>
    </div>
*/
MWToGitHub.getGitHubUserData();