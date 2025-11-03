import { ScrollView, Text, View } from "react-native"

export default function About () {
    return(
        <ScrollView className="flex-1 bg-gray-900 px-6 py-8">
            <Text className="text-white font-bold mb-8 text-2xl">About Liga A+7</Text>
            
            <View className="space-y-4">
                <Text className="text-white/90 mb-4 text-base leading-6">
                    Liga A+7 es la plataforma líder de fútbol amateur que conecta equipos, jugadores y aficionados en una experiencia deportiva única. Nuestra misión es democratizar el acceso al fútbol competitivo.
                </Text>
                
                <Text className="text-white/90 mb-4 text-base leading-6">
                    Fundada por apasionados del fútbol, ofrecemos torneos profesionales con arbitraje certificado, estadísticas detalladas y un sistema de ranking que permite a todos los equipos competir de manera justa.
                </Text>
                
                <Text className="text-white/90 mb-4 text-base leading-6">
                    Nuestros torneos se realizan en las mejores canchas de la ciudad, con horarios flexibles que se adaptan a la vida laboral de nuestros jugadores. Cada partido es una oportunidad de crecimiento.
                </Text>
                
                <Text className="text-white/90 mb-4 text-base leading-6">
                    La tecnología es clave en nuestra propuesta: desde la inscripción online hasta el seguimiento de estadísticas en tiempo real, facilitamos cada aspecto de la experiencia futbolística.
                </Text>
                
                <Text className="text-white/90 mb-4 text-base leading-6">
                    Más de 500 equipos ya confían en Liga A+7 para sus competencias. Nuestra comunidad crece cada día, uniendo personas que comparten la misma pasión por el deporte más hermoso del mundo.
                </Text>
                
                <Text className="text-white/90 mb-4 text-base leading-6">
                    Únete a la revolución del fútbol amateur. En Liga A+7 no solo juegas, también formas parte de una familia que celebra cada gol, cada jugada y cada momento de gloria en el campo de juego.
                </Text>
            </View>
        </ScrollView>
    )
}