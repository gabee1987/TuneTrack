// app/game-rules.tsx
import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import AppButton from "@/components/AppButton";
import RuleCard from "@/components/RuleCard";
import { router } from "expo-router";
import GradientBackground from "@/components/ui/GradientBackground";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";

export default function GameRulesScreen() {
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <GradientBackground>
        <View style={styles.statusBar}>
          <TouchableOpacity style={styles.closeButton} onPress={handleBack}>
            <Ionicons name="close-circle-outline" size={36} color="white" />
          </TouchableOpacity>
        </View>

        {/* A scrollable view for all the rule cards */}
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText type="title" style={styles.headerTitle}>
            TuneTrack Játékszabályok
          </ThemedText>

          {/* INTRO / BEVEZETŐ */}
          <RuleCard
            title="Azonnali Partihangulat a TuneTrackkel!"
            content={[
              "Hallgassatok meg több mint 100 év legnagyobb slágereit! Felváltva tegyétek a dalokat az idővonalatokra időrendi sorrendben, és élvezzétek a közös nosztalgiázást.",
              "Válasszatok egy nehézségi szintet, vagy akár különböző fokozatokat személyenként, hogy mindenkinek igazán izgalmas legyen a játék!",
            ]}
          />

          {/* NEHÉZSÉGI SZINTEK */}
          <RuleCard
            title="Nehézségi szintek"
            content={[
              "Instant Party: Csak helyezd el a dalokat időrendi sorrendben!",
              "Original: Igazi muzsikus-fan vagy? Ismerd fel az előadót és a szám címét is!",
              "Pro: Már fejből vágod a számok címét, előadóját, és a nagyjából mikori kiadását is.",
              "Expert: Mesteri fokozat – tudnod kell az előadó, a cím és az ÉV pontos kombinációját!",
              "Kooperatív: Fogjatok össze egy csapatként, és közös idővonalat építsetek!",
            ]}
          />

          {/* ORIGINAL JÁTÉKMENET */}
          <RuleCard
            title="Original – Hogyan zajlik a játék?"
            content={[
              "1) Előkészület: Döntsétek el, egyénileg vagy csapatban játszotok. Minden játékos vagy csapat kap 2 TuneTrack zsetont és 1 zenei kártyát, amit dátum oldalával felfelé maguk elé helyeznek kezdésként.",
              "2) DJ kiválasztása: Ha Spotify Premiumot használtok, a DJ könnyen elindíthatja a dalokat. Ha Spotify Free vagy más streaming-szolgáltatás van, akkor a DJ vagy sorban mindenki beolvassa a kártyát (vagy megkeresi a dalt).",
              "3) Beolvasás: A DJ beolvassa a kártyát a TuneTrack alkalmazással, így megszólal a dal.",
              "4) Elhelyezés: A DJ balján ülő játékos megpróbálja a kártyát pontosan a saját idővonalán a megfelelő helyre tenni (balra, jobbra vagy két kártya közé).",
              "5) Felfordítás és ellenőrzés: Ha jó helyre tetted, megtarthatod a kártyát. Ha nem, eldobod. Kivéve, ha valaki TuneTrack zsetonnal bekiáltotta, hogy rosszul raktad. Ha 10 kártyát helyesen összegyűjtesz, nyertél!",
              "6) TuneTrack zsetonok: Költs 1 zsetont, ha nem ismered a dalt és átugranád; kiáltsd, hogy „TuneTrack!”, ha szerinted az ellenfél rossz helyre rakta, és lopd el a kártyát; vagy 3 zsetont cserélj be egy automatikus kártyára a pakliból!",
            ]}
          />

          {/* PRO */}
          <RuleCard
            title="Pro – Miben tér el?"
            content={[
              "Pro fokozatban továbbra sem kell a pontos évet tudnod, de az előadót és a szám címét muszáj eltalálni. Egyébként a szabályok az Original menetre épülnek.",
              "Minden Pro játékos 5 TuneTrack zsetonnal indul, és csak akkor tarthatja meg a kártyát, ha a dal előadója és címe is helyes. Ugyanez érvényes a kártyalopásra is.",
              "Nincs új zseton szerzés a helyes megfejtésért – maradsz a kezdőkészletnél.",
            ]}
          />

          {/* EXPERT */}
          <RuleCard
            title="Expert – A legnehezebb mód"
            content={[
              "Expert fokozatban nem elég a dal címét és az előadót ismerni: a pontos kiadási évet is tudnod kell! Ezt ráadásul a kártya idővonalra helyezésével együtt kell megnevezned.",
              "Itt 3 TuneTrack zsetonnal indulsz. Ha nem sikerül kitalálnod a dal címét, előadóját és az ÉVET, akkor nem tarthatod meg a kártyát.",
              "A zsetonhasználat megegyezik az Original módszerrel, de a lopásnál is pontosan tudnod kell a címet, előadót és az évet.",
            ]}
          />

          {/* KOOPERATÍV */}
          <RuleCard
            title="Kooperatív – Játsszatok Együtt!"
            content={[
              "Ha nem akartok egymás ellen harcolni, válasszátok a kooperatív módot. Egy csapat vagytok, és közösen építitek az idővonalat.",
              "Minden csapat 5 TuneTrack zsetont kap, és 1 kezdő kártyát a dátum oldalával felfelé. Minden új kártyát együtt illesztetek be a közös idővonalba. Helyes sorrendért megtarthatjátok, a rossz helyért elvesztetek 1 zsetont.",
              "Próbáljátok meg összegyűjteni 10 kártyát, mielőtt elfogynak a zsetonjaitok!",
            ]}
          />

          {/* BACK BUTTON or some navigation button */}
          <View style={styles.footer}>
            <AppButton
              style={styles.menuButton}
              title="Vissza"
              onPress={handleBack}
            />
          </View>
        </ScrollView>
      </GradientBackground>
    </View>
  );
}

// -- STYLES --
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
  statusBar: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    alignItems: "center",
    marginBottom: 30,
  },
  menuButton: {
    paddingHorizontal: 10,
    width: "70%",
    marginBottom: 20,
  },
});
