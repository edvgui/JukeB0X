# JukeB0X : mp3 library API
*Autumn 2019* -- Everarts de Velp Guillaume

JukeB0X is a simple REST API that allows to upload mp3 files and retrieve them.  This solution is presented under a docker
container shape to make easier the deployment of the app.

You can find the detailed API [here](https://edvgui.github.io/JukeBOX).

## Installation
To create the docker container image, in the project folder, simply run :
```bash
docker build -t jukeB0X .
```

To run a container you then have to type :
 ```bash
 docker run -d -p 80:80 jukeB0X
 ```
 
:bulb: **Installation check** : simply open your browser and visit this link : [http://localhost/ok](http://localhost/ok)

## Contributing
This project is developed without any guarantee of further improvement of maintenance.  If you want to help your help is 
welcome, you can start by posting issues and pull requests. 

## License
This project is under [MIT license](LICENSE), feel free to use it at your own will.
