import React, { Component } from 'react';
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux'; 
import Select from 'react-select';
import moment from 'moment';
import * as opportunitiesActions from '../actions/opportunitiesAction'; 
import 'react-select/dist/react-select.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import R from 'ramda';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css'
 
class SideBar extends Component { 
  constructor(props, context) {
    super(props, context);
    this.state = {
      skillsvalue: [],
      bgvalue: [],
      errorbg:'',
      address: 'Chennai, Tamil Nadu, India'
    };
    this.onChange = (address) => this.setState({ address })
    this.handleSkillsSelectChange = this.handleSkillsSelectChange.bind(this);
    this.handleBackgroundSelectChange = this.handleBackgroundSelectChange.bind(this);
    this.updateOppr = this.updateOppr.bind(this);
  }
  handleSkillsSelectChange(skillsvalue) {
    this.setState({ skillsvalue });
  }
  handleBackgroundSelectChange(bgvalue) {
    if(this.state.bgvalue.length<3 || this.state.bgvalue.length > bgvalue.length)
      this.setState({ bgvalue:bgvalue,backgrounderr:'' });
    else
      this.setState({backgrounderr: 'Maximum of 3 backgrounds can be chosen.'})
  }
  updateOppr() {
    const {opprId,onDismiss} = this.props;
    let updatedOppr = {};
    let skillsIds = []
    for (var i =0 ;i<this.state.skillsvalue.length;i++) {
      skillsIds.push({"option": "required","level": 0,"id":this.state.skillsvalue[i]['value'],"name":this.state.skillsvalue[i]['label']})
    }
    let backgroundIds = []
    for (var i =0 ;i<this.state.bgvalue.length;i++) {
      backgroundIds.push({"option": "required","level": 0,"id":this.state.bgvalue[i]['value'],"name":this.state.bgvalue[i]['label']})
    }
    if(R.isEmpty(this.opprtitle.value)) {
      this.setState({nameerr:'Name is required',descerr:'',addresserr:'',skillserr:'',backgrounderr:'',applicationerr:'',earliesterr:'',latesterr:'',salaryerr: '',selectionerr:''});
    } else if(R.isEmpty(this.description.value)) {
      this.setState({descerr:'Description is required',nameerr:'',addresserr:'',skillserr:'',backgrounderr:'',applicationerr:'',earliesterr:'',latesterr:'',salaryerr: '',selectionerr:''});
    } else if(R.isEmpty(this.state.address)) {
      this.setState({addresserr: 'City Name Required',descerr:'',nameerr:'',skillserr:'',backgrounderr:'',applicationerr:'',earliesterr:'',latesterr:'',salaryerr: '',selectionerr:''});
    } else if(R.isEmpty(skillsIds)) {
      this.setState({skillserr:'Skills are required',descerr:'',addresserr:'',nameerr:'',backgrounderr:'',applicationerr:'',earliesterr:'',latesterr:'',salaryerr: '',selectionerr:''});
    } else if(R.isEmpty(backgroundIds)) {
      this.setState({backgrounderr:'Background is required',descerr:'',addresserr:'',skillserr:'',nameerr:'',applicationerr:'',earliesterr:'',latesterr:'',salaryerr: '',selectionerr:''});
    } else if(R.isEmpty(this.applicationsclosedate.state.inputValue)) {
      this.setState({applicationerr: 'Application Close Date is required',descerr:'',addresserr:'',skillserr:'',backgrounderr:'',nameerr:'',earliesterr:'',latesterr:'',salaryerr: '',selectionerr:''});
    } else if(R.isEmpty(this.earlieststartdate.state.inputValue)) {
      this.setState({earliesterr: 'Earliest Start Date is required',descerr:'',addresserr:'',skillserr:'',backgrounderr:'',applicationerr:'',nameerr:'',latesterr:'',salaryerr: '',selectionerr:''});
    } else if(R.isEmpty(this.latestenddate.state.inputValue)) {
      this.setState({latesterr: 'Latest End Date is required',descerr:'',addresserr:'',skillserr:'',backgrounderr:'',applicationerr:'',earliesterr:'',nameerr:'',salaryerr: '',selectionerr:''});
    } else if(R.isEmpty(this.salary.value)) {
      this.setState({salaryerr: 'Salary is required',descerr:'',addresserr:'',skillserr:'',backgrounderr:'',applicationerr:'',earliesterr:'',latesterr:'',nameerr: '',selectionerr:''});
    } else if(R.isEmpty(this.selectionprocess.value)) {
      this.setState({selectionerr: 'Selection Process is required',descerr:'',addresserr:'',skillserr:'',backgrounderr:'',applicationerr:'',earliesterr:'',latesterr:'',salaryerr: '',nameerr:''});
    } else {
        let appclosedate = new Date() - new Date(this.applicationsclosedate.state.inputValue);
        appclosedate = Math.abs(Math.floor((appclosedate/1000)/60/60/24));
        updatedOppr['title'] = this.opprtitle.value;
        updatedOppr['description'] = this.description.value;
        updatedOppr['role_info'] = {};
        updatedOppr['role_info']['city'] = this.state.address;
        updatedOppr['skills'] = {};
        updatedOppr['skills'] = skillsIds;
        updatedOppr['backgrounds'] = {};
        updatedOppr['backgrounds'] = backgroundIds;
        updatedOppr['applications_close_date'] = new Date(this.applicationsclosedate.state.inputValue).toISOString()
        updatedOppr['earliest_start_date'] = new Date(this.earlieststartdate.state.inputValue).toISOString();
        updatedOppr['latest_end_date'] = new Date(this.latestenddate.state.inputValue).toISOString();
        updatedOppr['salary'] = this.salary.value;
        updatedOppr['selection_process'] = this.selectionprocess.value;
        let oppr = {};
        oppr['opportunity'] = updatedOppr;
        //this.props.actions.updateOpportunities(opprId,oppr);
        onDismiss();
    }
  }
  render() {
    let className;
    const {isActive,onDismiss,opprId,opprInfo,opprupdate} = this.props;
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }
    // if(opprupdate!= false) {
    //   onDismiss();
    // }
    //hard-coding the value of background api as it remains constant and also making an async call will take more time than accessing from a local variable
    //however api for background can be accessed from  this.props.actions.loadOpportunitiesBackGround();
    let backgroundSkills = [{value:224,label:"Accounting"},{value:225,label:"Aerospace engineering"},{value:226,label:"Agriculture"},{value:1275,label:"Anthropology"},{value:227,label:"Archeology"},{value:228,label:"Architecture"},{value:229,label:"Arts"},{value:1276,label:"Assurance"},{value:1277,label:"Audit"},{value:230,label:"Automotive engineering"},{value:231,label:"Banking"},{value:1278,label:"Bioengineering"},{value:232,label:"Biology"},{value:1279,label:"Biomedical Science"},{value:233,label:"Business administration"},{value:234,label:"Chemical engineering"},{value:235,label:"Chemistry"},{value:236,label:"Civil engineering"},{value:237,label:"Communication & journalism"},{value:238,label:"Computer engineering"},{value:239,label:"Computer sciences"},{value:1280,label:"Design"},{value:1281,label:"Earth Sciences"},{value:1282,label:"Ecology"},{value:240,label:"Economics"},{value:241,label:"Education"},{value:242,label:"Electrical engineering"},{value:243,label:"Electronics engineering"},{value:1283,label:"Entrepreneurship"},{value:244,label:"Environmental engineering"},{value:245,label:"Finance"},{value:246,label:"Geography"},{value:247,label:"Graphic design"},{value:1284,label:"Health Science"},{value:1285,label:"History"},{value:1286,label:"Human Resources"},{value:1287,label:"Industrial Design"},{value:248,label:"Industrial engineering"},{value:249,label:"International relations"},{value:1288,label:"International Trade"},{value:1289,label:"Languages"},{value:250,label:"Law"},{value:251,label:"Linguistics"},{value:252,label:"Literature"},{value:1290,label:"Logistics"},{value:253,label:"Marketing"},{value:254,label:"Material engineering"},{value:255,label:"Mathematics"},{value:256,label:"Mechanical engineering"},{value:1291,label:"Media Arts"},{value:257,label:"Medicine"},{value:258,label:"Military sciences"},{value:1292,label:"Music"},{value:259,label:"Nanotechnology"},{value:1293,label:"Nursing"},{value:271,label:"Other"},{value:1294,label:"Petroleum Engineering"},{value:260,label:"Philosophy"},{value:261,label:"Physics"},{value:262,label:"Political science"},{value:263,label:"Psychology"},{value:264,label:"Public administration"},{value:265,label:"Public relations"},{value:266,label:"Religion"},{value:1295,label:"Social Work"},{value:267,label:"Sociology"},{value:268,label:"Software development and programming"},{value:1296,label:"Sports"},{value:1297,label:"Statistics"},{value:1298,label:"Systems and Computing Engineering"},{value:269,label:"Telecomunication engineering"},{value:1299,label:"Theater"},{value:270,label:"Tourism & hotel management"}];
    //hard-coding the value of skills api as it remains constant and also making an async call will take more time than accessing from a local variable
    //however api for skills can be accessed from  this.props.actions.loadOpportunitiesSkills();
    let skillsValue = [{value:147,label:"3D Max"},{value:1216,label:"ABAP"},{value:1217,label:"Ada"},{value:1170,label:"Adaptability"},{value:1148,label:"Adobe After Effects"},{value:1149,label:"Adobe Audition"},{value:1150,label:"Adobe Bridge"},{value:1151,label:"Adobe Dreamweaver"},{value:152,label:"Adobe Flash"},{value:150,label:"Adobe Illustrator"},{value:1152,label:"Adobe InDesign"},{value:1153,label:"Adobe Lightroom"},{value:1154,label:"Adobe Premiere Pro"},{value:171,label:"Aerospace Engineering"},{value:1267,label:"Agile development"},{value:175,label:"Aircraft Engine Technology"},{value:78,label:"Ajax"},{value:1218,label:"Algorithms"},{value:1219,label:"Alice"},{value:112,label:"Android"},{value:1140,label:"Android studio"},{value:1268,label:"Angular JS"},{value:1220,label:"Apex"},{value:1221,label:"Artificial Intelligence"},{value:111,label:"AS/400"},{value:68,label:"ASP"},{value:89,label:"Assembly"},{value:1141,label:"Atom"},{value:148,label:"Auto-CAD"},{value:173,label:"Automotive Engineering"},{value:1222,label:"Awk"},{value:1124,label:"AWS (Amazon Web Services)"},{value:115,label:"Baan"},{value:1223,label:"Bash"},{value:1171,label:"Blogging"},{value:1224,label:"Boostrap"},{value:1172,label:"Business Intelligence"},{value:61,label:"C"},{value:72,label:"C#"},{value:62,label:"C++"},{value:207,label:"Cake PHP"},{value:163,label:"Client servicing"},{value:1225,label:"Cloud Computing"},{value:1173,label:"Coaching"},{value:63,label:"COBOL"},{value:208,label:"CodeIgniter"},{value:1174,label:"Collaboration"},{value:59,label:"Community Development"},{value:169,label:"Computer aided technical design"},{value:183,label:"Construction Engineering"},{value:196,label:"Construction Management"},{value:1175,label:"Consulting"},{value:1176,label:"Content Marketing"},{value:1177,label:"Content Strategy"},{value:1164,label:"Controlling"},{value:149,label:"Corel Draw"},{value:1178,label:"Creativity"},{value:1179,label:"Critical Thinking"},{value:79,label:"CSS"},{value:86,label:"CVS"},{value:1226,label:"D"},{value:1227,label:"Dart"},{value:1180,label:"Data Analysis"},{value:1181,label:"Data Analytics"},{value:1135,label:"Database Administration"},{value:128,label:"Database design"},{value:1136,label:"Database Management"},{value:1182,label:"Data Engineering"},{value:1183,label:"Data Mining"},{value:1184,label:"Data Science"},{value:1185,label:"Data Warehousing"},{value:138,label:"DB/2"},{value:129,label:"Delphi"},{value:1228,label:"Delphi/Object Pascal"},{value:178,label:"Designing Commercial Aircrafts"},{value:1186,label:"Digital Marketing"},{value:219,label:"Django"},{value:1166,label:"DNS"},{value:57,label:"Driver's licence"},{value:1126,label:"Dropbox"},{value:223,label:"Drupal"},{value:134,label:"Eclipse"},{value:203,label:"Ecology"},{value:1137,label:"Elasticsearch"},{value:1119,label:"Empowerment of others"},{value:174,label:"Engineering Mechanics"},{value:185,label:"Ergonomics"},{value:1229,label:"Erlang"},{value:1187,label:"Event Planning"},{value:1269,label:"Express"},{value:1270,label:"Extreme programming"},{value:1230,label:"F#"},{value:1188,label:"Facilitation"},{value:1155,label:"Filming"},{value:1156,label:"Final Cut Pro"},{value:160,label:"Financial management"},{value:194,label:"Fire Safety Engineering"},{value:58,label:"First Aid"},{value:172,label:"Fluid Mechanics"},{value:1231,label:"Fortran"},{value:1232,label:"Foundation"},{value:80,label:"FoxPro"},{value:180,label:"Fuel Cells"},{value:1233,label:"Full Stack development"},{value:1234,label:"Game Development"},{value:1142,label:"Git"},{value:85,label:"GIT"},{value:1235,label:"Go"},{value:1127,label:"Google Drive"},{value:1236,label:"Groovy"},{value:214,label:"GTK"},{value:1237,label:"Hadoop"},{value:1189,label:"Handling Pressure"},{value:1238,label:"Haskell"},{value:1125,label:"Heroku"},{value:1190,label:"Hiring"},{value:1198,label:"HR induction"},{value:65,label:"HTML"},{value:87,label:"HTML 5"},{value:1191,label:"Human Resources"},{value:198,label:"Hydrology"},{value:199,label:"Hydromechanics"},{value:1157,label:"Image editing"},{value:1158,label:"iMovie"},{value:1192,label:"Information Security"},{value:167,label:"Internet usage"},{value:195,label:"Introductory Structural design"},{value:113,label:"iOS"},{value:104,label:"IP/MPLS"},{value:93,label:"IPX"},{value:73,label:"J#"},{value:66,label:"Java"},{value:211,label:"Java EE"},{value:69,label:"Javascript"},{value:221,label:"Joomla"},{value:216,label:"jQuery"},{value:74,label:"Jscript"},{value:1239,label:"JSON"},{value:1271,label:"Kanban"},{value:1128,label:"Keynote"},{value:1240,label:"LabVIEW"},{value:1241,label:"Ladder Logic"},{value:162,label:"Language Teaching"},{value:95,label:"LAN (local area network)"},{value:1272,label:"Lavarel"},{value:158,label:"Leadership"},{value:1242,label:"Less"},{value:1169,label:"Linux"},{value:1243,label:"Lisp"},{value:1244,label:"Logo"},{value:123,label:"Lotus Notes/Domino"},{value:1245,label:"Lua"},{value:179,label:"Machine Elements"},{value:110,label:"MacOS"},{value:166,label:"Mac usage"},{value:186,label:"Manufacturing Technology"},{value:1193,label:"Market Research"},{value:182,label:"Mass and Heat Transfer"},{value:170,label:"Material Science"},{value:1246,label:"MATLAB"},{value:1247,label:"MDL"},{value:177,label:"Mechanical Process Engineering"},{value:188,label:"Mechanics"},{value:1194,label:"Media Planning"},{value:81,label:"Mercury"},{value:137,label:"Microsoft Access"},{value:118,label:"Microsoft Dynamics"},{value:1129,label:"Microsoft Excel"},{value:1130,label:"Microsoft Powerpoint"},{value:139,label:"Microsoft SQL Server"},{value:1131,label:"Microsoft Word"},{value:105,label:"Microwave Transmission"},{value:1248,label:"Mobile Development"},{value:145,label:"MongoDB"},{value:108,label:"MS DOS"},{value:124,label:"MS Exchange"},{value:143,label:"MySQL"},{value:1195,label:"Negotiation"},{value:213,label:".NET"},{value:135,label:"Netbeans"},{value:100,label:"Network Design"},{value:101,label:"Network security"},{value:218,label:"Node.js"},{value:144,label:"NoSQL"},{value:125,label:"Novell Groupwise"},{value:92,label:"Novell netware"},{value:1143,label:"NPM"},{value:88,label:"Objective C"},{value:1249,label:"OpenEdge ABL"},{value:184,label:"Operations Research"},{value:82,label:"OPS5"},{value:102,label:"Optical fibers"},{value:121,label:"Oracle"},{value:140,label:"Oracle Database"},{value:154,label:"Organisational Management"},{value:130,label:"Other Development Tools"},{value:1132,label:"Pages"},{value:64,label:"Pascal"},{value:116,label:"PeopleSoft"},{value:67,label:"Perl"},{value:151,label:"Photoshop"},{value:76,label:"PHP"},{value:1250,label:"PL/SQL"},{value:142,label:"PostgreSQL"},{value:131,label:"Powerbuilder"},{value:159,label:"Presentation skills"},{value:1196,label:"Problem Solving"},{value:201,label:"Process Engineering"},{value:156,label:"Project Management"},{value:83,label:"Prolog"},{value:217,label:"Protype"},{value:1197,label:"Public Relations"},{value:77,label:"Python"},{value:1251,label:"Q"},{value:215,label:"Qt"},{value:1252,label:"R"},{value:1273,label:"React JS"},{value:1199,label:"Recruiting"},{value:1200,label:"Relationship Management"},{value:200,label:"Renewable Energies"},{value:1201,label:"Research"},{value:1202,label:"Risk Management"},{value:176,label:"Rotor Technology"},{value:1167,label:"Router setup"},{value:1253,label:"RPG (OS/400)"},{value:84,label:"Ruby"},{value:210,label:"Ruby on Rails"},{value:1254,label:"Rust"},{value:161,label:"Sales"},{value:119,label:"Salesforce"},{value:117,label:"SAP"},{value:1255,label:"SAS"},{value:1256,label:"SASS"},{value:1257,label:"Scala"},{value:1258,label:"Scheme"},{value:1259,label:"Scratch"},{value:1274,label:"SCRUM"},{value:1203,label:"Search Engine Optimization (SEO)"},{value:1120,label:"Self Awareness"},{value:1204,label:"Self-Confidence"},{value:1160,label:"Sharepoint"},{value:120,label:"Siebel"},{value:1161,label:"Slack"},{value:1205,label:"Social Media Management"},{value:1260,label:"Software Engineering"},{value:197,label:"Soil Mechanics"},{value:191,label:"Solid Construction"},{value:1121,label:"Solution Orientation"},{value:1159,label:"Sony Vegas"},{value:1261,label:"SPSS"},{value:71,label:"SQL"},{value:1138,label:"SQLite"},{value:1133,label:"Squarespace"},{value:1262,label:"Stata"},{value:189,label:"Static"},{value:192,label:"Steel Construction"},{value:1206,label:"Strategic Planning"},{value:1207,label:"Strategy"},{value:212,label:"Struts"},{value:1144,label:"Sublime"},{value:1165,label:"Supply Chain management"},{value:1263,label:"Swift"},{value:141,label:"Sybase"},{value:209,label:"Symfony"},{value:1139,label:"Tableau"},{value:94,label:"TCP/IP"},{value:155,label:"Team Management"},{value:1208,label:"Technical Support"},{value:193,label:"Technology of Building Materials"},{value:181,label:"Thermodynamics"},{value:1209,label:"Time Management"},{value:157,label:"Training"},{value:1264,label:"Transact-SQL"},{value:1210,label:"UI design"},{value:99,label:"UMTS/GSM network management"},{value:107,label:"UNIX"},{value:90,label:"Unix shell scripting"},{value:1265,label:"User Testing"},{value:1211,label:"UX design"},{value:1266,label:"VBScript"},{value:1145,label:"Vim"},{value:75,label:"Visual Basic"},{value:133,label:"Visual C++"},{value:1215,label:"(Visual) FoxPro"},{value:132,label:"Visual Studio"},{value:98,label:"Voice - IP Telephony (VoIP)"},{value:96,label:"WAN (wide area network)"},{value:97,label:"WAP (Wireless Application Protocol)"},{value:202,label:"Waste & Water Management"},{value:103,label:"WDM"},{value:1212,label:"Web Content"},{value:1168,label:"WiFi network setup"},{value:109,label:"Windows"},{value:165,label:"Windows PC usage"},{value:1134,label:"Wix"},{value:190,label:"Wood Construction"},{value:222,label:"Wordpress"},{value:1213,label:"Work Ethic"},{value:1162,label:"Workplace"},{value:1122,label:"World citizenship"},{value:1214,label:"Writing"},{value:1146,label:"Xamarin"},{value:1147,label:"Xcode"},{value:70,label:"XML"},{value:206,label:"Yii"},{value:205,label:"Zend"},{value:1163,label:"Zoho"}];
    if(!!opprId&&opprInfo.length===0) {
      this.props.actions.loadOpportunity(opprId);       
      //this.props.actions.loadGooglePlaces('Chennai');
    } else if(!!opprInfo.id && opprInfo.id === opprId){
      this.opprtitle.value = opprInfo.title;
      this.applicationsclosedate.value = opprInfo.applications_close_date;
      this.earlieststartdate.value = opprInfo.earliest_start_date;
      this.latestenddate.value = opprInfo.latest_end_date;
      this.description.value = opprInfo.description;
      //this.backgrounds.value = opprInfo.backgrounds;
     // this.skills.value = opprInfo.skills;
      this.selectionprocess.value = opprInfo.selection_process;
      this.salary.value = opprInfo.salary;
      //this.city.value = opprInfo.role_info.city;
    }
    if(isActive) className='overlay-head'
    else className='overlay-hide'
    const AutocompleteItem = ({ suggestion }) => (<div><i className="fa fa-map-marker"/>{suggestion}</div>)
    return (
      <div className={className}>
        <div className='overlay-sidebar'>
          <div className='overlay-rest' style={{background: 'rgb(0,0,0,0.5)'}} onClick={onDismiss}></div>
            <div className='overlay-layer-container'>
              <div className='col-sm-12 col-md-12'>
                <h4 className='heading-form font-weight-600'>Edit Opportunity</h4>
                <div className='col-sm-12 col-md-12'>
                  <div className='col-sm-12 col-md-12 form-group input-group zero-margin'>
                  <h4 className='heading-form-small'>Title</h4>
                  <input className="form-control" id="opprtitle" type="text" ref={(input) => { this.opprtitle = input; }} name='opprtitle' placeholder="" />
                  <span className="errclass">{this.state.nameerr}</span>
                  </div>
                  <div className='col-sm-12 col-md-12 form-group input-group zero-margin'>
                  <h4 className='heading-form-small'>Application Close Date</h4>
                  <Datetime ref={(input) => { this.applicationsclosedate = input; }} />
                  <span className="errclass">{this.state.applicationerr}</span>
                  </div>
                  <div className='col-sm-12 col-md-12 form-group input-group zero-margin'>
                  <h4 className='heading-form-small'>Earlist Start Date</h4>
                  <Datetime ref={(input) => { this.earlieststartdate = input; }} />
                  <span className="errclass">{this.state.earliesterr}</span>
                  </div>
                  <div className='col-sm-12 col-md-12 form-group input-group zero-margin'>
                  <h4 className='heading-form-small'>Latest End Date</h4>
                  <Datetime ref={(input) => { this.latestenddate = input; }} />
                  <span className="errclass">{this.state.latesterr}</span>
                  </div>
                  <div className='col-sm-12 col-md-12 form-group input-group zero-margin'>
                  <h4 className='heading-form-small'>Description</h4>
                  <input className="form-control" id="description" type="text" ref={(input) => { this.description = input; }} name='description' placeholder="" />
                  <span className="errclass">{this.state.descerr}</span>
                  </div>
                  <div className='col-sm-12 col-md-12 form-group input-group zero-margin'>
                  <h4 className='heading-form-small'>Backgrounds</h4>
                  <Select
                        name="backgrounds"
                        value={this.state.bgvalue}
                        multi={true}
                        onChange={this.handleBackgroundSelectChange}
                        options={backgroundSkills}
                        />
                      <span className="errclass">{this.state.backgrounderr}</span>
                  </div>
                  <div className='col-sm-12 col-md-12 form-group input-group zero-margin'>
                  <h4 className='heading-form-small'>Skills</h4>
                  <Select
                        name="skills"
                        value={this.state.skillsvalue}
                        multi={true}
                        onChange={this.handleSkillsSelectChange}
                        options={skillsValue}
                        />
                        <span className="errclass">{this.state.skillserr}</span>
                  </div>
                  <div className='col-sm-12 col-md-12 form-group input-group zero-margin'>
                  <h4 className='heading-form-small'>Selection Process</h4>
                  <input className="form-control" id="selectionprocess" type="text" ref={(input) => { this.selectionprocess = input; }} name='selectionprocess' placeholder="" />
                  <span className="errclass">{this.state.selectionerr}</span>
                  </div>
                  <div className='col-sm-12 col-md-12 form-group input-group zero-margin'>
                  <h4 className='heading-form-small'>Salary</h4>
                  <input className="form-control" id="salary" type="text" ref={(input) => { this.salary = input; }} name='salary' placeholder="" />
                  <span className="errclass">{this.state.salaryerr}</span>
                  </div>
                  <div className='col-sm-12 col-md-12 form-group input-group zero-margin'>
                  <h4 className='heading-form-small'>City</h4>
                    <PlacesAutocomplete
                        inputProps={inputProps}
                        autocompleteItem={AutocompleteItem}
                      />
                      <span className="errclass">{this.state.addresserr}</span>
                  </div>
                </div>
                <span className="user-view-buttons float-right">
                <input type="submit" onClick={this.updateOppr} className="btn btn-add user-view" value="Update" />    
                  &nbsp;&nbsp;&nbsp;<input type="submit" onClick={onDismiss} className="btn btn-add user-view" value="Close" />
                </span>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    opprInfo: state.opprinfo,
    opprskills: state.opprskills,
    mapsdata: state.mapsdata,
    opprbgskills: state.opprbgskills,
    opprupdate: state.opprupdate
  };
}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(opportunitiesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
